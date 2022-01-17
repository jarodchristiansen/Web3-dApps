const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

// Pre-emptively deletes build directory to maintain that output file is up to date
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

// Selects the campaign path to select the output file that is being compiled.
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');
const output = solc.compile(source, 1).contracts;

// Creates build folder
fs.ensureDirSync(buildPath);

// Ouputs the json file for each contract found in the output
for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        output[contract]
    );
}

