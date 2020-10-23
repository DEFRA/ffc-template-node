#!/usr/bin/env node

const fs = require('fs')
const readline = require('readline')

const originalProjectName = 'ffc-template-node'
const originalNamespace = 'ffc-demo'
const originalDescription = 'description-of-project-goes-here'

function processInput (args) {
  const [, , projectName, description] = args
  if (args.length === 2) {
    console.error('Please enter a new name and description for the project e.g. ffc-demo-web "Web frontend for demo workstream".')
    process.exit(1)
  }
  if (args.length !== 4 || !projectName || projectName.split('-').length < 3 || !description) {
    const errMsg = [
      'Please enter a new name and description for the project.',
      'The name must contain two hypens and be of the form "<program>-<worksream>-<repo>" e.g. "ffc-demo-web".',
      'The description must not be empty and be wrapped in quotes e.g. "excellent new description".'
    ]
    console.error(errMsg.join('\n'))
    process.exit(1)
  }
  return { description, projectName }
}

async function confirmRename (projectName, description) {
  const affirmativeAnswer = 'yes'
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  return new Promise((resolve, reject) => {
    rl.question(`Do you want to rename the project to '${projectName}', with a description of '${description}'?\nType '${affirmativeAnswer}' to confirm\n`, (answer) => {
      rl.close()
      resolve(answer === affirmativeAnswer)
    })
  })
}

async function getHelmDir () {
  const projectName = await fs.promises.readdir('./helm')
  return `./helm/${projectName}`
}

async function getHelmFiles () {
  // assuming the only dir in ./helm is the project name.
  // getting the name here removes dependency on it being updated.
  const helmDir = await getHelmDir()
  const baseFiles = ['Chart.yaml', 'values.yaml']
  const templateFiles = ['templates/_container.yaml', 'templates/cluster-ip-service.yaml', 'templates/config-map.yaml', 'templates/deployment.yaml']
  const files = [...baseFiles, ...templateFiles]

  const helmFiles = files.map((file) => {
    return `${helmDir}/${file}`
  })
  return helmFiles
}

function getRootFiles () {
  return ['package.json', 'package-lock.json', 'docker-compose.yaml', 'docker-compose.test.yaml', 'docker-compose.override.yaml']
}

function getNamespace (projectName) {
  const firstIndex = projectName.indexOf('-')
  const secondIndex = projectName.indexOf('-', firstIndex + 1)
  return projectName.substring(0, secondIndex)
}

async function renameDirs (projectName) {
  const helmDir = await getHelmDir()
  await fs.promises.rename(helmDir, `./helm/${projectName}`)
}

async function updateProjectName (projectName) {
  const rootFiles = getRootFiles()
  const helmFiles = await getHelmFiles()
  const filesToUpdate = [...rootFiles, ...helmFiles]
  const namespace = getNamespace(projectName)

  filesToUpdate.forEach(async (file) => {
    console.log(`Updating '${file}' with projectName...`)
    const content = await fs.promises.readFile(file, 'utf8')
    const projectNameRegex = new RegExp(originalProjectName, 'g')
    const namespaceRegex = new RegExp(originalNamespace, 'g')
    const updatedContent = content.replace(projectNameRegex, projectName).replace(namespaceRegex, namespace)
    await fs.promises.writeFile(file, updatedContent)
  })
}

async function updateProjectDescription (description) {
  const helmDir = await getHelmDir()
  const filesToUpdate = ['package.json', `${helmDir}/Chart.yaml`]

  filesToUpdate.forEach(async (file) => {
    console.log(`Updating '${file}' with description...`)
    const content = await fs.promises.readFile(file, 'utf8')
    const updatedContent = content.replace(originalDescription, description)
    await fs.promises.writeFile(file, updatedContent)
  })
}

async function rename () {
  const { description, projectName } = processInput(process.argv)
  const rename = await confirmRename(projectName, description)
  if (rename) {
    console.log(`Project will be renamed to '${projectName}'.`)
    await renameDirs(projectName)
    await updateProjectName(projectName)
    await updateProjectDescription(description)
  } else {
    console.log('Project has not been renamed.')
  }
}

rename()
