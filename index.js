#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import { differenceInSeconds } from "date-fns";
console.log("\t---------------------------------");
console.log(chalk.bold.rgb(27, 879, 56)("\tWELCOME TO THE COUNTDOWN TIMER!!!"));
console.log("\t---------------------------------");
let choose = await inquirer.prompt([{
        name: "choose",
        type: "list",
        message: "What would you like to do???",
        choices: ["Start Timer", "Exit"]
    }]);
let start = choose.choose;
if (start === "Start Timer") {
    const res = await inquirer.prompt([{
            name: "userinput",
            type: "number",
            message: "Enter countdown duration in seconds:",
            validate: (input) => {
                if (isNaN(input)) {
                    return "Please enter a valid number greater than 0 and less than 61";
                }
                else if (input > 60) {
                    return "Please enter a valid number greater than 0 and less than 61.";
                }
                else {
                    return true;
                }
            }
        }]);
    let input = res.userinput;
    async function starttime(val) {
        console.log(chalk.blue(`Starting countdown for ${input} seconds...`));
        const inttime = new Date().setSeconds(new Date().getSeconds() + val);
        const intervaltime = new Date(inttime);
        setInterval(async () => {
            const currenttime = new Date();
            const time_difference = differenceInSeconds(intervaltime, currenttime);
            if (val < 0) {
                console.log(chalk.green.bold("\n\tCountdown finished!"));
                process.exit();
            }
            console.clear();
            console.log(chalk.yellow(`\tTime remaining: ${val.toString().padStart(2, "0")} seconds`));
            val--;
        }, 1000);
    }
    starttime(input);
}
else if (start === "Exit") {
    console.log(chalk.red("Exiting..."));
    process.exit();
}
