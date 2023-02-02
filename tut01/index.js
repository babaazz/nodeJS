const fs = require("fs").promises;
const path = require("path");

// File Ops using fs promises

const fileOps = async () => {
  try {
    const data = await fs.readFile(
      path.join(__dirname, "files", "text1.txt"),
      "utf-8"
    );
    console.log(data);

    console.log("fisrt part is done \n\n");
    await fs.writeFile(path.join(__dirname, "files", "writePromise.txt"), data);
    await fs.appendFile(
      path.join(__dirname, "files", "writePromise.txt"),
      "\n\n You are a piece of shit"
    );
    await fs.rename(
      path.join(__dirname, "files", "writePromise.txt"),
      path.join(__dirname, "files", "promiseComplete.txt")
    );

    const newData = await fs.readFile(
      path.join(__dirname, "files", "newPromise.txt"),
      "utf-8"
    );
    console.log(newData);
  } catch (error) {}
};

fileOps();

// fs.readFile("./files/text11.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log(err.message);
//   } else {
//     console.log(data);
//   }
// });

// async function readFile() {
//   try {
//     const data = await fs.readFile("./files/text11.txt", "utf-8");
//     console.log(data);
//   } catch (err) {
//     console.log(err.message);
//   }
// }

// readFile();

// write file

// fs.writeFile("./files/write.txt", "Fuck you mother fucker", (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("File is written");
//   }
// });

//exit on uncaught exceptions

process.on("uncaughtException", (err) => {
  console.log(`There was an errror: ${err}`);
  process.exit(1);
});
