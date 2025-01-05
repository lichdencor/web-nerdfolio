"use strict";

/**
 * Configuraciones
 */
const configs = {
  general_help: `
&lt; general &gt;<br>
&bull; <span class='highlight'>help</span>: Displays the list of available commands.<br><br>

&lt; relevant information &gt;<br>
&bull; <span class='highlight'>experience</span>: Shows professional experience.<br>
&bull; <span class='highlight'>education</span>: Lists academic qualifications.<br>
&bull; <span class='highlight'>contact</span>: Provides contact information.<br><br>

&lt; miscellaneous &gt;<br>
&bull; <span class='highlight'>whoami</span>: Displays the current user's identity.<br>
&bull; <span class='highlight'>date</span>: Shows the current date and time.<br>
&bull; <span class='highlight'>clear</span>: Clears the terminal or display.<br>
&bull; <span class='highlight'>reboot</span>: Restarts the application.<br>
`,
  experience_help: `<br/>
&bull; <span class='highlight'>CriptoVisualizer</span>: 2024 - Present
<br/>Backend Developer and Database Administrator at CRViser<br>
I am responsible for designing and implementing an ETL (Extract, Transform, Load) process for CriptoVisualizer. The project uses PostgreSQL, Flask, and KNIME to consolidate data from multiple APIs into a single, well-structured SQL database.
<br/>`,
  education_help: `<br/>
&bull;<span class='highlight'>Universidad Tres de Febrero</span>: March 2020 - December 2022, Sound Engineering<br>
&emsp;&bull; Learned Python<br>
&emsp;&bull; Learned VB6<br><br>

&bull;<span class='highlight'>Universidad de Belgrano</span>: March 2023 - Ongoing, Information Systems Engineering<br>
&emsp;&bull; Learned Java<br>
&emsp;&bull; Learned Design Patterns<br>
&emsp;&bull; Learned Data Structures<br>
&emsp;&bull; Learned Network Protocols<br>
&emsp;&bull; Learned Operating Systems<br>
`,
  contact_help: `<br/><br/>
&bull; <span class='highlight'>lucasignaciodencor@gmail.com</span>: Send an email to this address.<br/>
&bull; <span class='highlight'>https://github.com/lichdencor</span>: Visit my GitHub profile.<br/>
&bull; <span class='highlight'>https://www.linkedin.com/in/lichdencor/</span>: Connect with me on LinkedIn.<br/>
&bull; <span class='highlight'>https://https://x.com/Pilotero_</span>: Hit me on X!.<br/>`,
  reboot_message:
    "Preparing to reboot...\n\n3...\n\n2...\n\n1...\n\nRebooting...\n\n",
  username: "Username",
  hostname: "Host",
  platform: "Platform",
  host: "lichdencor.com",
  user: "guest",
  is_root: false,
  type_delay: 0, // Sin retraso para escritura instantánea
};

/**
 * Archivos
 */
const files = {
  "about.txt":
    "This website was made using only pure JavaScript. Customize by modifying the 'configs' and 'files' variables.",
  "contact.txt": `<br/>
&bull; <span class='highlight'>lucasignaciodencor@gmail.com</span>: Send an email to this address.<br/>
&bull; <span class='highlight'><a href="https://github.com/lichdencor" target="_blank">lichdencor</a></span>: Visit my GitHub profile.<br/>
&bull; <span class='highlight'><a href="https://www.linkedin.com/in/lichdencor/" target="_blank">Lucas Ignacio Chavez Dencor</a></span>: Connect with me on LinkedIn.<br/>
&bull; <span class='highlight'><a href="https://x.com/Pilotero_" target="_blank">Pilotero_</a></span>: Hit me on X!.<br/>`,
};

/**
 * Clase Terminal
 */
class Terminal {
  constructor(prompt, output, user, host, root) {
    this.prompt = prompt;
    this.output = output;
    this.user = user;
    this.host = host;
    this.root = root;
    this.completePrompt = user + "@" + host + ":~" + (root ? "#" : "$");
    this.commandBuffer = ""; // Almacena el comando mientras se escribe
    this.isTyping = false; // Bandera para evitar múltiples entradas durante la escritura
  }

  type(text) {
    // No hay retraso en el efecto de escritura, el texto se imprime instantáneamente
    this.output.innerHTML += text;
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.output.scrollTop = this.output.scrollHeight;
  }

  exec() {
    const command = this.commandBuffer.trim();
    this.commandBuffer = ""; // Clear the command buffer after execution

    if (command === "") return; // Do nothing if input is empty

    // Output the command once and then execute it
    this.output.innerHTML += "<br/>";

    // Process the command
    this.processCommand(command);

    // Add a line break after the output of the command
    setTimeout(() => {
      this.output.innerHTML += "<br/>"; // Line break between command output and next prompt

      // Add the prompt for the next command on a new line
      this.output.innerHTML +=
        "<span class='prompt-color'>" + this.completePrompt + "</span> ";
      this.scrollToBottom(); // Ensure the terminal scrolls down to the new prompt
    }, 100);
  }

  processCommand(command) {
    switch (command.toLowerCase()) {
      case "help":
        this.type(configs.general_help);
        break;
      case "experience":
        this.type(configs.experience_help);
        break;
      case "education":
        this.type(configs.education_help);
        break;
      case "contact":
        this.type(files["contact.txt"]);
        break;
      case "whoami":
        this.type(configs.user);
        break;
      case "date":
        this.type(new Date().toLocaleString());
        break;
      case "clear":
        this.output.innerHTML = ""; // Clear the output
        // Re-add the prompt without extra line breaks
        this.output.innerHTML =
          "<span class='prompt-color'>" + this.completePrompt + "</span> ";
        this.scrollToBottom(); // Ensure scrolling
        break;
      case "reboot":
        this.type(configs.reboot_message);
        setTimeout(() => {
          window.location.href = "index.html";
        }, 1500); // Simulate reboot
        break;
      default:
        this.type(configs.invalid_command_message.replace("<value>", command));
        break;
    }
  }

  init() {
    // Start by displaying the welcome message
    this.output.innerHTML = "Type 'help' to get a list of commands.<br/>";

    // Add the prompt after the welcome message
    this.output.innerHTML +=
      '<span class="prompt-color">' + this.completePrompt + "</span> ";

    document.body.addEventListener("click", () => this.prompt.focus());
    document.addEventListener("keydown", (event) => {
      if (this.isTyping) return; // Ignore input while typing

      if (event.which === 13 || event.keyCode === 13) {
        // Enter key
        this.exec();
        event.preventDefault();
        event.stopPropagation();
      } else if (event.key === "Backspace") {
        // Backspace key
        this.commandBuffer = this.commandBuffer.slice(0, -1);
        this.output.innerHTML = this.output.innerHTML.slice(0, -1); // Remove the last character from output
      } else if (event.key.length === 1) {
        // Handle normal character input
        this.commandBuffer += event.key;
        this.output.innerHTML += event.key; // Simulate typing
        this.scrollToBottom();
      }
    });
  }
}

/**
 * Principal
 */
document.addEventListener("DOMContentLoaded", function () {
  var terminal = new Terminal(
    document.querySelector("#prompt"),
    document.querySelector("#output"),
    configs.user,
    configs.host,
    configs.is_root
  );

  terminal.init();

  document.querySelector("#cmdline");
});
