#!/usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let playerName;

const sleept = ( ms = 3000 ) => new Promise((r) => setTimeout(r, ms));

async function welcome()
{
    const rainbowTitle = chalkAnimation.rainbow(
        `Who Wants To Be A NodeJS Expert? \n`
    );

    await sleept();
    rainbowTitle.stop();

    console.log(`
        ${chalk.bgRed(`HOW TO PLAY`)}
        I am a process on your computer.
        if you get any question wrong I will be
    `)
}

async function askName()
{
    const answers = await inquirer.prompt(
    {
        name: `player_name`,
        type: `input`,
        message: `What is your name?`,
        default()
        {
            return `Player`;
        },
    });

    playerName = answers.player_name;
}

async function question1()
{
    const answers = await inquirer.prompt({
        name: `question_1`,
        type: `list`,
        message: `NodeJS was released on\n`,
        choices: 
        [
            `May 27, 2009`,
            `January 1, 1999`,
            `June 27, 2009`,
            `May 27, 3009`,
        ]
    });

    return handleAnswer(answers.question_1 == `May 27, 2009`);
}

async function question2()
{
    const answers = await inquirer.prompt({
        name: `question_2`,
        type: `list`,
        message: `Who was the original author?\n`,
        choices: 
        [
            `Elon Musk`,
            `Ryan Dahl`,
            `Sundar Pichai`,
            `Kenneth Lane Thompson`,
        ]
    });

    return handleAnswer(answers.question_2 == `Ryan Dahl`);
}

async function handleAnswer(isCorrect)
{
    const spinner = createSpinner(`Checking answer...`).start();
    await sleept();

    if (isCorrect) { spinner.success({ text: `Nice work ${playerName}. That's correct`}); }
    else { spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}`}); process.exit(1)}
}

function winner()
{
    console.clear();
    const msg = `Congrats , ${playerName} !\n $ 1 , 0 0 0 , 0 0 0`;

    figlet(msg, (err, data) =>
    {
        console.log(gradient.pastel.multiline(data));
    });
}

await welcome();
await askName();
await question1();
await question2();
winner();