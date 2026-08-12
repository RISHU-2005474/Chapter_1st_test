import { Question } from '../types';

export const QUESTIONS: Question[] = [
  // --- EASY QUESTIONS (1 to 30) ---
  {
    id: 1,
    question: "What does CPU stand for in computer architecture?",
    options: [
      "Central Processing Unit",
      "Control Processing Unit",
      "Computer Processing Unit",
      "Central Performance Unit"
    ],
    correctAnswer: 0,
    explanation: "CPU stands for Central Processing Unit, often considered the brain of the computer responsible for executing instructions.",
    difficulty: "Easy",
    category: "Hardware & CPU"
  },
  {
    id: 2,
    question: "Which of the following is an input device?",
    options: [
      "Monitor",
      "Printer",
      "Keyboard",
      "Speaker"
    ],
    correctAnswer: 2,
    explanation: "A Keyboard is used to feed data and instructions into the computer, making it an input device. Monitors, printers, and speakers are output devices.",
    difficulty: "Easy",
    category: "Input/Output Devices"
  },
  {
    id: 3,
    question: "What is the full form of RAM?",
    options: [
      "Read Access Memory",
      "Random Access Memory",
      "Rapid Access Memory",
      "Run Access Memory"
    ],
    correctAnswer: 1,
    explanation: "RAM stands for Random Access Memory. It is the primary volatile storage used by the CPU to store data currently in use.",
    difficulty: "Easy",
    category: "Memory"
  },
  {
    id: 4,
    question: "What is the full form of ROM?",
    options: [
      "Read Only Memory",
      "Random Only Memory",
      "Read Operational Memory",
      "Real Online Memory"
    ],
    correctAnswer: 0,
    explanation: "ROM stands for Read Only Memory. It holds non-volatile system startup code such as BIOS/UEFI.",
    difficulty: "Easy",
    category: "Memory"
  },
  {
    id: 5,
    question: "Which component is known as the 'Brain of the Computer'?",
    options: [
      "Hard Disk",
      "RAM",
      "Central Processing Unit (CPU)",
      "Motherboard"
    ],
    correctAnswer: 2,
    explanation: "The CPU is called the brain of the computer because it performs arithmetic, logical, and control operations.",
    difficulty: "Easy",
    category: "Hardware & CPU"
  },
  {
    id: 6,
    question: "1 Byte is equivalent to how many Bits?",
    options: [
      "4 Bits",
      "8 Bits",
      "16 Bits",
      "1024 Bits"
    ],
    correctAnswer: 1,
    explanation: "In computer memory measurement, 1 Byte consists of exactly 8 Bits.",
    difficulty: "Easy",
    category: "Memory & Units"
  },
  {
    id: 7,
    question: "4 Bits equal to which memory unit?",
    options: [
      "1 Byte",
      "1 Nibble",
      "1 Kilobyte",
      "1 Word"
    ],
    correctAnswer: 1,
    explanation: "A group of 4 bits is called 1 Nibble (or half a byte).",
    difficulty: "Easy",
    category: "Memory & Units"
  },
  {
    id: 8,
    question: "Which generation of computers used Vacuum Tubes?",
    options: [
      "First Generation",
      "Second Generation",
      "Third Generation",
      "Fourth Generation"
    ],
    correctAnswer: 0,
    explanation: "First-generation computers (1940-1956) utilized vacuum tubes as basic circuitry components.",
    difficulty: "Easy",
    category: "History & Generations"
  },
  {
    id: 9,
    question: "Transistors were used in which generation of computers?",
    options: [
      "First Generation",
      "Second Generation",
      "Third Generation",
      "Fourth Generation"
    ],
    correctAnswer: 1,
    explanation: "Second-generation computers (1956-1963) replaced vacuum tubes with smaller and more reliable transistors.",
    difficulty: "Easy",
    category: "History & Generations"
  },
  {
    id: 10,
    question: "Integrated Circuits (ICs) were introduced in which computer generation?",
    options: [
      "First Generation",
      "Second Generation",
      "Third Generation",
      "Fifth Generation"
    ],
    correctAnswer: 2,
    explanation: "Third-generation computers (1964-1971) used Integrated Circuits (ICs) invented by Jack Kilby and Robert Noyce.",
    difficulty: "Easy",
    category: "History & Generations"
  },
  {
    id: 11,
    question: "Microprocessors were introduced in which generation of computers?",
    options: [
      "Second Generation",
      "Third Generation",
      "Fourth Generation",
      "Fifth Generation"
    ],
    correctAnswer: 2,
    explanation: "Fourth-generation computers (1971-present) use Microprocessors built with VLSI/ULSI technology.",
    difficulty: "Easy",
    category: "History & Generations"
  },
  {
    id: 12,
    question: "Which generation of computers is based on Artificial Intelligence (AI)?",
    options: [
      "Third Generation",
      "Fourth Generation",
      "Fifth Generation",
      "Sixth Generation"
    ],
    correctAnswer: 2,
    explanation: "Fifth-generation computers (present and beyond) are based on AI, natural language processing, and quantum computing concepts.",
    difficulty: "Easy",
    category: "History & Generations"
  },
  {
    id: 13,
    question: "Which of the following is an example of an Output Device?",
    options: [
      "Scanner",
      "Mouse",
      "Plotter",
      "Microphone"
    ],
    correctAnswer: 2,
    explanation: "A Plotter outputs high-quality vector graphic drawings, making it an output device. Scanner, mouse, and microphone are input devices.",
    difficulty: "Easy",
    category: "Input/Output Devices"
  },
  {
    id: 14,
    question: "What is the main function of an ALU in CPU?",
    options: [
      "Store permanent files",
      "Perform arithmetic and logical operations",
      "Display visual graphics",
      "Manage power distribution"
    ],
    correctAnswer: 1,
    explanation: "ALU (Arithmetic Logic Unit) executes mathematical operations (addition, subtraction) and logical comparisons (AND, OR, NOT).",
    difficulty: "Easy",
    category: "Hardware & CPU"
  },
  {
    id: 15,
    question: "Which unit controls the flow of data between CPU components and external peripherals?",
    options: [
      "ALU",
      "Control Unit (CU)",
      "RAM",
      "Hard Disk"
    ],
    correctAnswer: 1,
    explanation: "The Control Unit (CU) coordinates and directs all operations of the computer system like a supervisor.",
    difficulty: "Easy",
    category: "Hardware & CPU"
  },
  {
    id: 16,
    question: "Which key is used to refresh a web page or file explorer window in Windows?",
    options: [
      "F1",
      "F2",
      "F5",
      "F11"
    ],
    correctAnswer: 2,
    explanation: "The F5 function key is universally used to refresh or reload active windows/pages.",
    difficulty: "Easy",
    category: "Basics of Computer"
  },
  {
    id: 17,
    question: "What type of device is a Barcode Reader?",
    options: [
      "Output Device",
      "Input Device",
      "Storage Device",
      "Processing Device"
    ],
    correctAnswer: 1,
    explanation: "A Barcode Reader reads printed barcodes and transfers data into the computer system, functioning as an input device.",
    difficulty: "Easy",
    category: "Input/Output Devices"
  },
  {
    id: 18,
    question: "Which memory is volatile in nature?",
    options: [
      "ROM",
      "RAM",
      "Hard Disk Drive",
      "Flash Pen Drive"
    ],
    correctAnswer: 1,
    explanation: "RAM is volatile memory; its contents are erased as soon as power is turned off.",
    difficulty: "Easy",
    category: "Memory"
  },
  {
    id: 19,
    question: "Which memory is non-volatile in nature?",
    options: [
      "SRAM",
      "DRAM",
      "Cache Memory",
      "ROM"
    ],
    correctAnswer: 3,
    explanation: "ROM retains its stored information even when the computer power is switched off.",
    difficulty: "Easy",
    category: "Memory"
  },
  {
    id: 20,
    question: "What does ALU stand for?",
    options: [
      "Arithmetic Logic Unit",
      "Array Logic Unit",
      "Application Logic Unit",
      "Automated Logic Unit"
    ],
    correctAnswer: 0,
    explanation: "ALU stands for Arithmetic Logic Unit.",
    difficulty: "Easy",
    category: "Hardware & CPU"
  },
  {
    id: 21,
    question: "What does CU stand for in computer hardware?",
    options: [
      "Computer Unit",
      "Control Unit",
      "Central Unit",
      "Core Unit"
    ],
    correctAnswer: 1,
    explanation: "CU stands for Control Unit inside the CPU.",
    difficulty: "Easy",
    category: "Hardware & CPU"
  },
  {
    id: 22,
    question: "Which of the following is considered System Software?",
    options: [
      "MS Word",
      "Operating System",
      "Google Chrome",
      "VLC Media Player"
    ],
    correctAnswer: 1,
    explanation: "An Operating System (like Windows, Linux) is System Software that manages hardware resources and provides platform for application software.",
    difficulty: "Easy",
    category: "Software & OS"
  },
  {
    id: 23,
    question: "Which software is designed for performing specific user tasks like word processing?",
    options: [
      "System Software",
      "Application Software",
      "Utility Software",
      "Firmware"
    ],
    correctAnswer: 1,
    explanation: "Application software (e.g. MS Office, Photoshop) is tailored for specific user tasks.",
    difficulty: "Easy",
    category: "Software & OS"
  },
  {
    id: 24,
    question: "What is the smallest unit of data in a computer system?",
    options: [
      "Bit",
      "Byte",
      "Nibble",
      "Kilobyte"
    ],
    correctAnswer: 0,
    explanation: "A Bit (Binary Digit: 0 or 1) is the fundamental smallest unit of data in computing.",
    difficulty: "Easy",
    category: "Memory & Units"
  },
  {
    id: 25,
    question: "Which of the following is a Secondary Storage device?",
    options: [
      "RAM",
      "Cache Memory",
      "Hard Disk Drive (HDD)",
      "CPU Register"
    ],
    correctAnswer: 2,
    explanation: "Hard Disk Drive (HDD) is secondary permanent storage. RAM, Cache, and Registers are primary/internal storage.",
    difficulty: "Easy",
    category: "Memory & Storage"
  },
  {
    id: 26,
    question: "What does BIOS stand for?",
    options: [
      "Basic Input Output System",
      "Binary Input Output Software",
      "Basic Internal Operating System",
      "Bus Interface Operating System"
    ],
    correctAnswer: 0,
    explanation: "BIOS stands for Basic Input Output System, stored in ROM to initialize hardware during system bootup.",
    difficulty: "Easy",
    category: "Software & OS"
  },
  {
    id: 27,
    question: "Who is known as the Father of Computers?",
    options: [
      "Alan Turing",
      "Charles Babbage",
      "John von Neumann",
      "Blaise Pascal"
    ],
    correctAnswer: 1,
    explanation: "Charles Babbage is universally hailed as the Father of Computers for introducing the Analytical and Difference Engines.",
    difficulty: "Easy",
    category: "History & Generations"
  },
  {
    id: 28,
    question: "Who designed the first mechanical computer named 'Analytical Engine'?",
    options: [
      "Charles Babbage",
      "Herman Hollerith",
      "Joseph Jacquard",
      "Howard Aiken"
    ],
    correctAnswer: 0,
    explanation: "Charles Babbage designed the Analytical Engine in 1837, containing ALU, control flow, and integrated memory.",
    difficulty: "Easy",
    category: "History & Generations"
  },
  {
    id: 29,
    question: "Which component is used to power desktop computer components with DC voltage?",
    options: [
      "UPS",
      "SMPS",
      "POST",
      "BIOS"
    ],
    correctAnswer: 1,
    explanation: "SMPS (Switched-Mode Power Supply) converts household AC power into regulated DC voltage for internal computer components.",
    difficulty: "Easy",
    category: "Hardware & CPU"
  },
  {
    id: 30,
    question: "What does SMPS stand for?",
    options: [
      "Switched Mode Power Supply",
      "Simple Mode Power Supply",
      "System Main Power Service",
      "Single Mode Power Source"
    ],
    correctAnswer: 0,
    explanation: "SMPS stands for Switched Mode Power Supply.",
    difficulty: "Easy",
    category: "Hardware & CPU"
  },

  // --- MEDIUM QUESTIONS (31 to 80) ---
  {
    id: 31,
    question: "How many Bytes are there in 1 Kilobyte (KB) in standard binary representation?",
    options: [
      "1000 Bytes",
      "1024 Bytes",
      "512 Bytes",
      "2048 Bytes"
    ],
    correctAnswer: 1,
    explanation: "In binary system (2^10), 1 Kilobyte equals 1024 Bytes.",
    difficulty: "Medium",
    category: "Memory & Units"
  },
  {
    id: 32,
    question: "1 Megabyte (MB) is equal to how many Kilobytes?",
    options: [
      "1000 KB",
      "1024 KB",
      "1048576 KB",
      "512 KB"
    ],
    correctAnswer: 1,
    explanation: "1 MB = 1024 KB (2^20 bytes).",
    difficulty: "Medium",
    category: "Memory & Units"
  },
  {
    id: 33,
    question: "Which type of memory is directly placed on the CPU chip to reduce memory access times?",
    options: [
      "Virtual Memory",
      "Cache Memory",
      "Secondary Memory",
      "Flash Memory"
    ],
    correctAnswer: 1,
    explanation: "Cache memory (L1/L2/L3) sits between CPU cores and primary RAM to hold frequently accessed instructions.",
    difficulty: "Medium",
    category: "Memory"
  },
  {
    id: 34,
    question: "What is the process of loading the Operating System from disk into RAM when turning on a computer called?",
    options: [
      "Formatting",
      "Booting",
      "Compiling",
      "Debugging"
    ],
    correctAnswer: 1,
    explanation: "Booting is the initial startup sequence that loads the OS kernel into computer RAM.",
    difficulty: "Medium",
    category: "Software & OS"
  },
  {
    id: 35,
    question: "What is the difference between Cold Boot and Warm Boot?",
    options: [
      "Cold Boot uses liquid nitrogen, Warm Boot uses heat",
      "Cold Boot starts from a powered-off state; Warm Boot restarts an already powered-on system",
      "Cold Boot takes less time than Warm Boot",
      "Cold Boot does not require BIOS"
    ],
    correctAnswer: 1,
    explanation: "Cold boot occurs when turning on power from complete shutdown. Warm boot (reset/restart) reboots the system without interrupting main power.",
    difficulty: "Medium",
    category: "Software & OS"
  },
  {
    id: 36,
    question: "What does POST stand for in the computer startup process?",
    options: [
      "Power On Self Test",
      "Program Operational System Technology",
      "Primary Output Storage Terminal",
      "Power Operating System Test"
    ],
    correctAnswer: 0,
    explanation: "POST (Power On Self Test) is a diagnostic testing sequence performed by BIOS immediately after powering on.",
    difficulty: "Medium",
    category: "Software & OS"
  },
  {
    id: 37,
    question: "Which of the following is a non-impact printer?",
    options: [
      "Dot Matrix Printer",
      "Daisy Wheel Printer",
      "Laser Printer",
      "Line Printer"
    ],
    correctAnswer: 2,
    explanation: "Laser printers use toner and lasers without striking pins against ribbons, making them non-impact printers. Dot matrix and Daisy wheel are impact printers.",
    difficulty: "Medium",
    category: "Input/Output Devices"
  },
  {
    id: 38,
    question: "Which device converts analog signals into digital signals and vice versa for telecommunication?",
    options: [
      "Multiplexer",
      "Modem",
      "Router",
      "Switch"
    ],
    correctAnswer: 1,
    explanation: "Modem stands for Modulator-Demodulator. It converts digital binary signals to analog and vice-versa.",
    difficulty: "Medium",
    category: "Hardware & Networking"
  },
  {
    id: 39,
    question: "Which type of ROM can be erased by exposing it to strong Ultraviolet (UV) light?",
    options: [
      "PROM",
      "EPROM",
      "EEPROM",
      "Mask ROM"
    ],
    correctAnswer: 1,
    explanation: "EPROM (Erasable Programmable Read-Only Memory) chips can be cleared using intense ultraviolet light exposure.",
    difficulty: "Medium",
    category: "Memory"
  },
  {
    id: 40,
    question: "Which memory can be erased electrically byte by byte or block by block?",
    options: [
      "PROM",
      "EPROM",
      "EEPROM",
      "ROM"
    ],
    correctAnswer: 2,
    explanation: "EEPROM stands for Electrically Erasable Programmable Read-Only Memory. Flash drives use a variant of EEPROM technology.",
    difficulty: "Medium",
    category: "Memory"
  },
  {
    id: 41,
    question: "What is the fast internal memory register inside the CPU called?",
    options: [
      "Cache",
      "CPU Register",
      "DRAM",
      "Hard disk sector"
    ],
    correctAnswer: 1,
    explanation: "CPU Registers are the fastest, highest-speed storage locations directly inside the processor core.",
    difficulty: "Medium",
    category: "Hardware & CPU"
  },
  {
    id: 42,
    question: "What is the radix (base) of the Octal Number System?",
    options: [
      "2",
      "8",
      "10",
      "16"
    ],
    correctAnswer: 1,
    explanation: "The Octal number system uses base 8 containing digits from 0 to 7.",
    difficulty: "Medium",
    category: "Number Systems"
  },
  {
    id: 43,
    question: "What is the radix (base) of the Hexadecimal Number System?",
    options: [
      "8",
      "10",
      "12",
      "16"
    ],
    correctAnswer: 3,
    explanation: "Hexadecimal system is base 16, utilizing digits 0-9 and letters A-F to represent numbers 10-15.",
    difficulty: "Medium",
    category: "Number Systems"
  },
  {
    id: 44,
    question: "In Hexadecimal number system, which letter represents decimal value 12?",
    options: [
      "A",
      "B",
      "C",
      "D"
    ],
    correctAnswer: 2,
    explanation: "A=10, B=11, C=12, D=13, E=14, F=15 in Hexadecimal notation.",
    difficulty: "Medium",
    category: "Number Systems"
  },
  {
    id: 45,
    question: "Which number system is directly understood by computer hardware without translation?",
    options: [
      "Decimal System",
      "Binary System",
      "Hexadecimal System",
      "Assembly Language"
    ],
    correctAnswer: 1,
    explanation: "Binary (0s and 1s representing low/high electrical voltage states) is the native machine code level.",
    difficulty: "Medium",
    category: "Number Systems"
  },
  {
    id: 46,
    question: "What decimal number corresponds to the binary number (1010)_2?",
    options: [
      "8",
      "10",
      "12",
      "14"
    ],
    correctAnswer: 1,
    explanation: "(1010)_2 = 1*2^3 + 0*2^2 + 1*2^1 + 0*2^0 = 8 + 0 + 2 + 0 = 10.",
    difficulty: "Medium",
    category: "Number Systems"
  },
  {
    id: 47,
    question: "Convert decimal number 15 into 4-bit binary representation.",
    options: [
      "1100",
      "1110",
      "1111",
      "1011"
    ],
    correctAnswer: 2,
    explanation: "15 in binary is 8+4+2+1 = 1111_2.",
    difficulty: "Medium",
    category: "Number Systems"
  },
  {
    id: 48,
    question: "What is the full form of ASCII?",
    options: [
      "American Standard Code for Information Interchange",
      "American Standard Computer Information System",
      "Automated Standard Code for Information Interchange",
      "American System Code for Internet Integration"
    ],
    correctAnswer: 0,
    explanation: "ASCII stands for American Standard Code for Information Interchange.",
    difficulty: "Medium",
    category: "Number Systems & Encoding"
  },
  {
    id: 49,
    question: "Standard 7-bit ASCII code can encode how many unique characters?",
    options: [
      "64",
      "128",
      "256",
      "512"
    ],
    correctAnswer: 1,
    explanation: "2^7 = 128 unique character representations (0 to 127).",
    difficulty: "Medium",
    category: "Number Systems & Encoding"
  },
  {
    id: 50,
    question: "Which of the following character encodings can represent almost all written scripts in the world?",
    options: [
      "ASCII",
      "EBCDIC",
      "Unicode (UTF-8/UTF-16)",
      "ISCII"
    ],
    correctAnswer: 2,
    explanation: "Unicode provides a unique number for every character across global languages.",
    difficulty: "Medium",
    category: "Number Systems & Encoding"
  },
  {
    id: 51,
    question: "Which concept uses space on hard disk to simulate additional RAM when physical RAM is full?",
    options: [
      "Cache Memory",
      "Virtual Memory",
      "Read Only Memory",
      "Flash Memory"
    ],
    correctAnswer: 1,
    explanation: "Virtual Memory uses paging on hard drive (paging file/swap space) to extend RAM capacity virtually.",
    difficulty: "Medium",
    category: "Memory & OS"
  },
  {
    id: 52,
    question: "What is the full form of GUI in operating systems?",
    options: [
      "General User Interface",
      "Graphical User Interface",
      "Global Utility Interface",
      "Guided User Interaction"
    ],
    correctAnswer: 1,
    explanation: "GUI stands for Graphical User Interface, using visual icons, windows, and pointer interactions.",
    difficulty: "Medium",
    category: "Software & OS"
  },
  {
    id: 53,
    question: "Which operating system interface relies solely on text commands entered by the user?",
    options: [
      "GUI",
      "CLI / CUI (Command Line / Command User Interface)",
      "VUI (Voice User Interface)",
      "Touch Interface"
    ],
    correctAnswer: 1,
    explanation: "CLI (Command Line Interface) or CUI (Command User Interface) like MS-DOS or Linux Shell requires typing text commands.",
    difficulty: "Medium",
    category: "Software & OS"
  },
  {
    id: 54,
    question: "Which software translator converts an entire high-level program into machine code all at once before execution?",
    options: [
      "Interpreter",
      "Compiler",
      "Assembler",
      "Linker"
    ],
    correctAnswer: 1,
    explanation: "A Compiler scans and translates the entire source code file at once into object code before running.",
    difficulty: "Medium",
    category: "Software & Translators"
  },
  {
    id: 55,
    question: "Which software translator converts high-level code line-by-line during program execution?",
    options: [
      "Compiler",
      "Interpreter",
      "Assembler",
      "Loader"
    ],
    correctAnswer: 1,
    explanation: "An Interpreter translates source code line-by-line in real time as the program executes.",
    difficulty: "Medium",
    category: "Software & Translators"
  },
  {
    id: 56,
    question: "An Assembler translates which type of programming language into machine code?",
    options: [
      "High-Level Language (HLL)",
      "Assembly Language (Low-Level)",
      "Natural Language",
      "Machine Code"
    ],
    correctAnswer: 1,
    explanation: "An Assembler converts assembly language mnemonics (like MOV, ADD) into binary machine instructions.",
    difficulty: "Medium",
    category: "Software & Translators"
  },
  {
    id: 57,
    question: "Which component connects all major computer hardware parts like CPU, RAM, and expansion cards together?",
    options: [
      "Hard Disk",
      "Power Cable",
      "Motherboard (System Board)",
      "Cabinet"
    ],
    correctAnswer: 2,
    explanation: "The Motherboard is the primary printed circuit board holding CPU, RAM slots, buses, and expansion slots.",
    difficulty: "Medium",
    category: "Hardware & CPU"
  },
  {
    id: 58,
    question: "Which computer bus is unidirectional, transferring memory addresses from CPU to memory modules?",
    options: [
      "Data Bus",
      "Address Bus",
      "Control Bus",
      "Expansion Bus"
    ],
    correctAnswer: 1,
    explanation: "The Address Bus is unidirectional because memory locations are specified exclusively by the CPU.",
    difficulty: "Medium",
    category: "Hardware & Architecture"
  },
  {
    id: 59,
    question: "Which computer system bus is bidirectional, allowing data flow to and from the CPU?",
    options: [
      "Address Bus",
      "Data Bus",
      "Power Bus",
      "Clock Bus"
    ],
    correctAnswer: 1,
    explanation: "The Data Bus is bidirectional because the CPU both reads data from and writes data to memory and storage.",
    difficulty: "Medium",
    category: "Hardware & Architecture"
  },
  {
    id: 60,
    question: "What type of optical storage technology is used in CDs, DVDs, and Blu-ray Discs?",
    options: [
      "Magnetic storage",
      "Solid state semiconductor storage",
      "Optical laser reflection on pits and lands",
      "Phase change electrical pulse"
    ],
    correctAnswer: 2,
    explanation: "Optical drives use laser beams to read light reflected from microscopic pits and lands on reflective disc surfaces.",
    difficulty: "Medium",
    category: "Memory & Storage"
  },
  {
    id: 61,
    question: "What is the standard storage capacity of a single-sided single-layer DVD?",
    options: [
      "700 MB",
      "1.44 MB",
      "4.7 GB",
      "25 GB"
    ],
    correctAnswer: 2,
    explanation: "A standard single-layer single-sided DVD holds 4.7 GB of data. (CD holds 700 MB, standard floppy holds 1.44 MB).",
    difficulty: "Medium",
    category: "Memory & Storage"
  },
  {
    id: 62,
    question: "What is the typical storage capacity of a 3.5-inch High-Density Floppy Disk?",
    options: [
      "1.2 MB",
      "1.44 MB",
      "700 MB",
      "10 MB"
    ],
    correctAnswer: 1,
    explanation: "A traditional 3.5-inch micro-floppy disk has a standardized formatted storage capacity of 1.44 MB.",
    difficulty: "Medium",
    category: "Memory & Storage"
  },
  {
    id: 63,
    question: "Which utility software organizes fragmented file sectors on a hard drive to speed up file access?",
    options: [
      "Disk Cleanup",
      "Disk Defragmenter",
      "Antivirus",
      "Device Manager"
    ],
    correctAnswer: 1,
    explanation: "Disk Defragmenter re-arranges scattered file fragments into contiguous disk blocks for faster magnetic head read times.",
    difficulty: "Medium",
    category: "Software & Utilities"
  },
  {
    id: 64,
    question: "What is open-source software?",
    options: [
      "Software that is completely free to buy but source code is hidden",
      "Software whose source code is freely available for inspection, modification, and redistribution",
      "Software that works without any operating system",
      "Software manufactured exclusively by Microsoft"
    ],
    correctAnswer: 1,
    explanation: "Open-source software provides public access to its source code under licenses like GPL, MIT, or Apache.",
    difficulty: "Medium",
    category: "Software & OS"
  },
  {
    id: 65,
    question: "Which of the following operating systems is open-source?",
    options: [
      "Windows 11",
      "macOS",
      "Linux",
      "iOS"
    ],
    correctAnswer: 2,
    explanation: "Linux kernel and its distributions (Ubuntu, Fedora, Debian) are open-source software.",
    difficulty: "Medium",
    category: "Software & OS"
  },
  {
    id: 66,
    question: "What is Proprietary / Closed-Source Software?",
    options: [
      "Software with publicly open source code",
      "Software owned by an individual or company with restricted usage and hidden source code",
      "Software created by government only",
      "Software that runs without RAM"
    ],
    correctAnswer: 1,
    explanation: "Proprietary software (like Windows or MS Office) protects source code as trade secrets under copyright.",
    difficulty: "Medium",
    category: "Software & OS"
  },
  {
    id: 67,
    question: "What is Freeware software?",
    options: [
      "Software with open source code",
      "Software available free of monetary cost, but source code is usually closed",
      "Trial software that stops working after 30 days",
      "Software embedded in ROM chips"
    ],
    correctAnswer: 1,
    explanation: "Freeware is copyrighted software offered at no price (e.g. Adobe Acrobat Reader), though source code remains private.",
    difficulty: "Medium",
    category: "Software & OS"
  },
  {
    id: 68,
    question: "What is Shareware software?",
    options: [
      "Software provided free on a trial basis with limited features or time limits",
      "Software that can be modified by anyone",
      "Hardware test utility software",
      "Network sharing software"
    ],
    correctAnswer: 0,
    explanation: "Shareware is distributed free for evaluation (trial period) after which payment is expected for full features.",
    difficulty: "Medium",
    category: "Software & OS"
  },
  {
    id: 69,
    question: "Which technology is used in touchscreens to detect electrical conductive properties of the human body?",
    options: [
      "Resistive Touch",
      "Capacitive Touch",
      "Infrared Touch",
      "Optical Imaging"
    ],
    correctAnswer: 1,
    explanation: "Capacitive touchscreens use electrostatic field changes caused by skin contact for precise multi-touch.",
    difficulty: "Medium",
    category: "Input/Output Devices"
  },
  {
    id: 70,
    question: "What does MICR stand for, frequently used in processing bank cheques?",
    options: [
      "Magnetic Ink Character Recognition",
      "Micro Input Character Reader",
      "Machine Integrated Code Reader",
      "Magnetic Information Code Record"
    ],
    correctAnswer: 0,
    explanation: "MICR stands for Magnetic Ink Character Recognition, widely used in banking to read cheque numbers printed in magnetic ink.",
    difficulty: "Medium",
    category: "Input/Output Devices"
  },
  {
    id: 71,
    question: "What does OMR stand for in optical evaluation of answer sheets?",
    options: [
      "Optical Mark Recognition",
      "Optical Media Reader",
      "Online Mark Recorder",
      "Operational Mark Resolution"
    ],
    correctAnswer: 0,
    explanation: "OMR stands for Optical Mark Recognition, used to read shaded pencil or pen marks on standardized sheets.",
    difficulty: "Medium",
    category: "Input/Output Devices"
  },
  {
    id: 72,
    question: "What does OCR stand for in document digitization software?",
    options: [
      "Optical Character Recognition",
      "Optimal Code Reader",
      "Object Character Record",
      "Output Control Register"
    ],
    correctAnswer: 0,
    explanation: "OCR stands for Optical Character Recognition, converting scanned paper images into editable text strings.",
    difficulty: "Medium",
    category: "Input/Output Devices"
  },
  {
    id: 73,
    question: "Which computing device architecture stores both data and program instructions in the same memory unit?",
    options: [
      "Harvard Architecture",
      "Von Neumann Architecture",
      "Turing Machine",
      "RISC Architecture"
    ],
    correctAnswer: 1,
    explanation: "John von Neumann architecture features a single shared memory bus structure for storing data and instructions.",
    difficulty: "Medium",
    category: "History & Architecture"
  },
  {
    id: 74,
    question: "Which early computer is widely credited as the first general-purpose electronic digital computer?",
    options: [
      "UNIVAC",
      "ENIAC",
      "EDVAC",
      "MARK-1"
    ],
    correctAnswer: 1,
    explanation: "ENIAC (Electronic Numerical Integrator and Computer), designed by Mauchly and Eckert in 1945, was the first electronic general-purpose digital computer.",
    difficulty: "Medium",
    category: "History & Generations"
  },
  {
    id: 75,
    question: "What does ENIAC stand for?",
    options: [
      "Electronic Numerical Integrator and Computer",
      "Electrical Network Integrated Automatic Computer",
      "Electronic Network Information Access Controller",
      "Engineered Numerical Input Analysis Computer"
    ],
    correctAnswer: 0,
    explanation: "ENIAC stands for Electronic Numerical Integrator and Computer.",
    difficulty: "Medium",
    category: "History & Generations"
  },
  {
    id: 76,
    question: "What does UNIVAC stand for, the first commercially available computer?",
    options: [
      "Universal Automatic Computer",
      "United Variable Automatic Calculator",
      "Universal Value Analysis Computer",
      "Unified Vector Vector Processor"
    ],
    correctAnswer: 0,
    explanation: "UNIVAC stands for Universal Automatic Computer, launched commercially in 1951.",
    difficulty: "Medium",
    category: "History & Generations"
  },
  {
    id: 77,
    question: "Which type of computer is designed for processing extremely large complex scientific calculations like weather forecasting?",
    options: [
      "Mainframe Computer",
      "Supercomputer",
      "Minicomputer",
      "Microcomputer"
    ],
    correctAnswer: 1,
    explanation: "Supercomputers (e.g. PARAM Siddhi, Frontier) deliver massive floating-point processing speed (FLOPS) for scientific simulations.",
    difficulty: "Medium",
    category: "Basics & Classification"
  },
  {
    id: 78,
    question: "Which category of computers is designed to handle simultaneous transaction processing for thousands of enterprise users (e.g. Banks, Railways)?",
    options: [
      "Supercomputer",
      "Mainframe Computer",
      "Workstation",
      "Microcomputer"
    ],
    correctAnswer: 1,
    explanation: "Mainframe computers excel at high volume concurrent I/O transactions for large corporations.",
    difficulty: "Medium",
    category: "Basics & Classification"
  },
  {
    id: 79,
    question: "What is the main unit used to measure the clock speed of modern CPUs?",
    options: [
      "Megabytes (MB)",
      "Gigahertz (GHz)",
      "MIPS",
      "DPI"
    ],
    correctAnswer: 1,
    explanation: "CPU clock frequency is measured in Gigahertz (GHz), representing billions of clock cycles per second.",
    difficulty: "Medium",
    category: "Hardware & CPU"
  },
  {
    id: 80,
    question: "What does DPI stand for in printer resolution specification?",
    options: [
      "Dots Per Inch",
      "Data Per Inch",
      "Digital Pixel Integration",
      "Density Per Inch"
    ],
    correctAnswer: 0,
    explanation: "DPI (Dots Per Inch) measures print quality density.",
    difficulty: "Medium",
    category: "Input/Output Devices"
  },

  // --- HARD QUESTIONS (81 to 100) ---
  {
    id: 81,
    question: "Convert the binary number (1101.101)_2 into its equivalent Decimal number.",
    options: [
      "13.625",
      "13.5",
      "11.625",
      "13.375"
    ],
    correctAnswer: 0,
    explanation: "Integer part: 1*8 + 1*4 + 0*2 + 1*1 = 13. Fractional part: 1*(1/2) + 0*(1/4) + 1*(1/8) = 0.5 + 0 + 0.125 = 0.625. Total = 13.625.",
    difficulty: "Hard",
    category: "Number Systems"
  },
  {
    id: 82,
    question: "What is the 2's complement of the 8-bit binary number 00001100?",
    options: [
      "11110011",
      "11110100",
      "11110101",
      "00000011"
    ],
    correctAnswer: 1,
    explanation: "1's complement of 00001100 = 11110011. Adding 1 to 1's complement yields 11110100.",
    difficulty: "Hard",
    category: "Number Systems"
  },
  {
    id: 83,
    question: "Convert the Octal number (357)_8 directly into Hexadecimal format.",
    options: [
      "EF",
      "11011111",
      "EF_16",
      "EF (Hexadecimal)"
    ],
    correctAnswer: 0,
    explanation: "Convert 357_8 to 9-bit binary: 3=(011), 5=(101), 7=(111) -> 011101111. Group into 4s from right: (1111)=F, (1110)=E -> EF.",
    difficulty: "Hard",
    category: "Number Systems"
  },
  {
    id: 84,
    question: "Which of the following binary operations results in an arithmetic overflow in an 8-bit signed integer representation?",
    options: [
      "Adding 50 + 40",
      "Adding 100 + 30",
      "Adding 70 + 60",
      "Subtracting 20 - 10"
    ],
    correctAnswer: 2,
    explanation: "In 8-bit signed 2's complement integers, maximum positive value is +127. 70 + 60 = 130, which exceeds +127, causing signed overflow into the sign bit.",
    difficulty: "Hard",
    category: "Number Systems"
  },
  {
    id: 85,
    question: "What is the main advantage of SRAM (Static RAM) over DRAM (Dynamic RAM)?",
    options: [
      "SRAM is cheaper and denser than DRAM",
      "SRAM does not require continuous refresh cycles and is faster",
      "SRAM consumes zero electrical power",
      "SRAM uses optical storage technology"
    ],
    correctAnswer: 1,
    explanation: "SRAM uses flip-flop circuits (6 transistors per cell) and does not need periodic capacitor refresh, making it much faster than DRAM.",
    difficulty: "Hard",
    category: "Memory"
  },
  {
    id: 86,
    question: "Why does DRAM require periodic electrical refreshing?",
    options: [
      "Because DRAM stores bits on tiny capacitors that leak charge over time",
      "Because DRAM uses magnetic spin orientation",
      "To clear system virus infection",
      "To increase clock speed to GHz"
    ],
    correctAnswer: 0,
    explanation: "DRAM uses single transistor + capacitor memory cells. Capacitors slowly discharge and must be refreshed thousands of times per second.",
    difficulty: "Hard",
    category: "Memory"
  },
  {
    id: 87,
    question: "In CPU pipeline architecture, what does a 'Hazard' refer to?",
    options: [
      "Physical burning of the silicon die",
      "A situation where the next instruction cannot execute in its designated clock cycle",
      "Voltage fluctuation in the power supply",
      "Disk head crash"
    ],
    correctAnswer: 1,
    explanation: "Pipeline hazards (Structural, Data, or Control hazards) prevent the next instruction from executing in sequence, causing pipeline stalls.",
    difficulty: "Hard",
    category: "Hardware & Architecture"
  },
  {
    id: 88,
    question: "What is RISC architecture characterized by compared to CISC?",
    options: [
      "Variable-length complex instruction sets",
      "Reduced number of simple, fixed-length instructions executed in a single clock cycle",
      "Microcoded control unit with high transistor density",
      "Lack of internal registers"
    ],
    correctAnswer: 1,
    explanation: "RISC (Reduced Instruction Set Computer) utilizes simplified, uniform instructions optimized for pipelined single-cycle execution.",
    difficulty: "Hard",
    category: "Hardware & Architecture"
  },
  {
    id: 89,
    question: "Which interrupt type is generated directly by hardware peripherals (e.g. keyboard stroke or mouse movement)?",
    options: [
      "Software Interrupt",
      "Hardware Interrupt (External Interrupt)",
      "Trap",
      "Internal Exception"
    ],
    correctAnswer: 1,
    explanation: "External Peripherals signal the CPU using IRQ lines, triggering Hardware Interrupts.",
    difficulty: "Hard",
    category: "Hardware & OS"
  },
  {
    id: 90,
    question: "What is DMA (Direct Memory Access) controller used for?",
    options: [
      "To allow I/O devices to transfer data directly to/from main RAM without continuous CPU intervention",
      "To increase monitor refresh rate",
      "To convert 32-bit addresses to 64-bit addresses",
      "To execute logical AND/OR operations"
    ],
    correctAnswer: 0,
    explanation: "DMA bypasses CPU intervention during large data block transfers between peripherals (like SSD) and main memory.",
    difficulty: "Hard",
    category: "Hardware & Architecture"
  },
  {
    id: 91,
    question: "In solid state drives (SSD), what flash memory transistor technology is predominantly used?",
    options: [
      "Bipolar Junction Transistor (BJT)",
      "Floating-Gate NAND Flash Memory",
      "Vacuum diode",
      "ECL logic gates"
    ],
    correctAnswer: 1,
    explanation: "SSDs use floating-gate or charge-trap NAND flash memory cells to store trapped electronic charge non-volatiles.",
    difficulty: "Hard",
    category: "Memory & Storage"
  },
  {
    id: 92,
    question: "What is the function of the Program Counter (PC) register inside the CPU?",
    options: [
      "Stores the result of the latest ALU operation",
      "Holds the memory address of the NEXT instruction to be fetched and executed",
      "Counts the total number of physical memory chips",
      "Monitors system fan speed"
    ],
    correctAnswer: 1,
    explanation: "The Program Counter (PC) register points to the memory location of the next sequential instruction awaiting execution.",
    difficulty: "Hard",
    category: "Hardware & Architecture"
  },
  {
    id: 93,
    question: "What does the Memory Address Register (MAR) hold during a CPU read/write cycle?",
    options: [
      "The actual data byte being written",
      "The physical RAM address being accessed for read/write",
      "The status flags (Zero, Carry, Overflow)",
      "The instruction opcode"
    ],
    correctAnswer: 1,
    explanation: "MAR holds the memory location address that the CPU wants to read from or write to over the address bus.",
    difficulty: "Hard",
    category: "Hardware & Architecture"
  },
  {
    id: 94,
    question: "What is the difference between Cache Hit and Cache Miss?",
    options: [
      "Cache Hit means requested data was found in cache; Cache Miss means data was not in cache and must be fetched from RAM",
      "Cache Hit occurs when power fails; Cache Miss occurs during reboot",
      "Cache Hit applies only to ROM; Cache Miss applies to SSD",
      "There is no functional difference"
    ],
    correctAnswer: 0,
    explanation: "A Cache Hit means CPU found data in fast cache. A Cache Miss forces a slower fetch from primary RAM.",
    difficulty: "Hard",
    category: "Memory"
  },
  {
    id: 95,
    question: "What is BCD (Binary Coded Decimal) representation of the decimal number 89?",
    options: [
      "10001001",
      "01011001",
      "1011001",
      "11000100"
    ],
    correctAnswer: 0,
    explanation: "In BCD, each decimal digit is encoded into a separate 4-bit binary nibble. 8 = 1000, 9 = 1001 -> 10001001.",
    difficulty: "Hard",
    category: "Number Systems"
  },
  {
    id: 96,
    question: "Which law states that the number of transistors on a microchip doubles approximately every two years?",
    options: [
      "Amdaal's Law",
      "Moore's Law",
      "Metcalfe's Law",
      "Gustafson's Law"
    ],
    correctAnswer: 1,
    explanation: "Gordon Moore (co-founder of Intel) formulated Moore's Law in 1965.",
    difficulty: "Hard",
    category: "History & Architecture"
  },
  {
    id: 97,
    question: "In operating systems, what is 'Thrashing' in virtual memory management?",
    options: [
      "Physical damage to hard drive read heads",
      "A state where CPU spends more time swapping pages between RAM and disk than executing real work",
      "Overclocking processor clock frequency beyond safety limits",
      "Executing parallel threads on multi-core chips"
    ],
    correctAnswer: 1,
    explanation: "Thrashing occurs when main memory is overloaded and the system constantly pages data back and forth to disk, crashing system performance.",
    difficulty: "Hard",
    category: "Memory & OS"
  },
  {
    id: 98,
    question: "What is the purpose of the Accumulator (AC) register in classic von Neumann CPU models?",
    options: [
      "Holds intermediate results of arithmetic and logic operations executed by ALU",
      "Stores network IP packets",
      "Powers BIOS clock battery",
      "Holds OS kernel commands"
    ],
    correctAnswer: 0,
    explanation: "The Accumulator is a primary CPU register that stores immediate inputs and outputs generated by ALU operations.",
    difficulty: "Hard",
    category: "Hardware & Architecture"
  },
  {
    id: 99,
    question: "What is the Gray Code equivalent of binary 1011?",
    options: [
      "1110",
      "1101",
      "1010",
      "1111"
    ],
    correctAnswer: 0,
    explanation: "Binary to Gray Code conversion: MSB remains same (1). Next bits are XOR of adjacent binary bits: (1 XOR 0 = 1), (0 XOR 1 = 1), (1 XOR 1 = 0) -> 1110.",
    difficulty: "Hard",
    category: "Number Systems"
  },
  {
    id: 100,
    question: "Which bus topology arbitration method uses a master clock and rotating priority grant lines to resolve multi-master bus contentions?",
    options: [
      "Daisy Chaining / Centralized Arbitration",
      "Spanning Tree Protocol",
      "CSMA/CD",
      "Token Ring passing"
    ],
    correctAnswer: 0,
    explanation: "Centralized bus arbitration uses a dedicated arbiter hardware module with grant lines (like Daisy Chaining) to assign bus mastership.",
    difficulty: "Hard",
    category: "Hardware & Architecture"
  }
];
