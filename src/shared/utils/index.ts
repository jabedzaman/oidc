import * as exec from "node:child_process";
import * as os from "node:os";

export const ip: () => string = () => {
  const networkInterfaces = os.networkInterfaces();
  let localIP = "";

  for (const interfaceName in networkInterfaces) {
    const networkInterface = networkInterfaces[interfaceName];

    for (const alias of networkInterface) {
      if (alias.family === "IPv4" && !alias.internal) {
        localIP = alias.address;
        break;
      }
    }

    if (localIP) break;
  }

  return localIP;
};

export const getLastCommit = () => {
  return new Promise((resolve, reject) => {
    exec.exec(
      'git log -1 --pretty=format:"%H,%an,%ae,%s,%ad"',
      (error: any, stdout: any, stderr: any) => {
        if (error) {
          reject(`Error fetching last commit: ${stderr}`);
        } else {
          const [hash, author, email, message, date] = stdout.split(",");
          resolve({ hash, author, email, message, date });
        }
      }
    );
  });
};
