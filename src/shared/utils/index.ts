import * as os from "os";

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
