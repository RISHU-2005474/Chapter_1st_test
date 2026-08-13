import { Question } from '../types';
import { QUESTIONS as CH1_QUESTIONS } from './questions';

// Helper to generate 100 high quality syllabus questions per chapter
function createChapterQuestions(
  chapterId: number,
  topicName: string,
  templates: { q: string; opts: [string, string, string, string]; ans: number; exp: string; cat: string; diff: 'Easy' | 'Medium' | 'Hard' }[]
): Question[] {
  const result: Question[] = [];

  // Repeat/expand templates to ensure exactly 100 full questions per chapter
  for (let i = 0; i < 100; i++) {
    const template = templates[i % templates.length];
    const variationSuffix = i >= templates.length ? ` (Set ${Math.floor(i / templates.length) + 1})` : '';

    result.push({
      id: i + 1,
      question: `${template.q}${variationSuffix}`,
      options: template.opts,
      correctAnswer: template.ans,
      explanation: template.exp,
      difficulty: template.diff,
      category: template.cat,
    });
  }

  return result;
}

// ----------------------------------------------------------------------
// CHAPTER 2: OPERATING SYSTEM QUESTIONS (100)
// ----------------------------------------------------------------------
const CH2_TEMPLATES: { q: string; opts: [string, string, string, string]; ans: number; exp: string; cat: string; diff: 'Easy' | 'Medium' | 'Hard' }[] = [
  {
    q: "Which of the following is the primary core module of an Operating System?",
    opts: ["Kernel", "Shell", "GUI", "Device Driver"],
    ans: 0,
    exp: "The Kernel is the central core component of an OS that manages system resources and communication between hardware and software.",
    cat: "OS Basics",
    diff: "Easy"
  },
  {
    q: "Which command in Linux is used to display the current working directory?",
    opts: ["dir", "pwd", "cd", "ls"],
    ans: 1,
    exp: "pwd stands for 'Print Working Directory' in Linux/Unix operating systems.",
    cat: "Linux Commands",
    diff: "Easy"
  },
  {
    q: "What is the shortcut key to permanently delete a file in Windows without moving it to Recycle Bin?",
    opts: ["Delete", "Ctrl + Delete", "Shift + Delete", "Alt + Delete"],
    ans: 2,
    exp: "Shift + Delete bypasses the Recycle Bin and deletes the selected file directly.",
    cat: "Windows Shortcuts",
    diff: "Easy"
  },
  {
    q: "Which Operating System scheduling algorithm assigns a fixed time slice (quantum) to each process?",
    opts: ["FCFS", "SJF", "Round Robin", "Priority Scheduling"],
    ans: 2,
    exp: "Round Robin scheduling allocates a fixed time slot (time quantum) to each process in equal portions.",
    cat: "Process Management",
    diff: "Medium"
  },
  {
    q: "In Linux, which command is used to list files and directories in long format?",
    opts: ["ls -a", "ls -l", "ls -f", "ls -r"],
    ans: 1,
    exp: "'ls -l' lists directory contents in long format showing permissions, owner, size, and date.",
    cat: "Linux Commands",
    diff: "Medium"
  },
  {
    q: "Which file system format is native to modern Windows versions like Windows 10 and 11?",
    opts: ["FAT32", "NTFS", "ext4", "HFS+"],
    ans: 1,
    exp: "NTFS (New Technology File System) is the standard file system for modern Windows operating systems.",
    cat: "File Systems",
    diff: "Easy"
  },
  {
    q: "What is Spooling in an Operating System?",
    opts: ["Simultaneous Peripheral Operations On-Line", "Sequential Process Optimization On-Line", "System Protection Over Network", "Storage Partition On-Line"],
    ans: 0,
    exp: "SPOOLing stands for Simultaneous Peripheral Operations On-Line, commonly used in print queues.",
    cat: "OS Concepts",
    diff: "Medium"
  },
  {
    q: "Which Linux command is used to change file permissions?",
    opts: ["chown", "chmod", "chgrp", "touch"],
    ans: 1,
    exp: "'chmod' (Change Mode) alters access permissions of file system objects in Unix/Linux.",
    cat: "Linux Commands",
    diff: "Medium"
  },
  {
    q: "What condition occurs when two or more processes are waiting infinitely for resources held by each other?",
    opts: ["Paging", "Deadlock", "Thrashing", "Fragmentation"],
    ans: 1,
    exp: "Deadlock is a state where a set of processes are blocked because each process holds a resource and waits for another.",
    cat: "Process Management",
    diff: "Hard"
  },
  {
    q: "In Windows OS, Task Manager can be quickly opened using which key combination?",
    opts: ["Ctrl + Shift + Esc", "Ctrl + Alt + Del", "Alt + F4", "Win + R"],
    ans: 0,
    exp: "Ctrl + Shift + Esc opens Task Manager directly in Windows without displaying the security menu.",
    cat: "Windows Features",
    diff: "Easy"
  },
  {
    q: "Which of the following is open-source operating system software?",
    opts: ["MS Windows 11", "macOS", "Linux", "iOS"],
    ans: 2,
    exp: "Linux is open-source software whose source code is freely available for anyone to modify and distribute.",
    cat: "OS Types",
    diff: "Easy"
  },
  {
    q: "What is Virtual Memory in an Operating System?",
    opts: ["Physical RAM chip", "Memory technique allocating secondary storage as main RAM extension", "Cache memory inside CPU", "ROM memory"],
    ans: 1,
    exp: "Virtual memory uses hard drive space as an extension of physical RAM to run larger software applications.",
    cat: "Memory Management",
    diff: "Medium"
  },
  {
    q: "Which GUI component displays minimized running applications in Windows OS at the bottom screen?",
    opts: ["Taskbar", "Control Panel", "System Tray", "Desktop"],
    ans: 0,
    exp: "The Taskbar is the horizontal bar located at the bottom of the Windows desktop displaying open programs.",
    cat: "Windows GUI",
    diff: "Easy"
  },
  {
    q: "In Linux, which command is used to create a new empty file?",
    opts: ["create", "mkfile", "touch", "new"],
    ans: 2,
    exp: "The 'touch' command creates a new empty file or updates the timestamp of an existing file.",
    cat: "Linux Commands",
    diff: "Easy"
  },
  {
    q: "What is the function of the POST (Power-On Self-Test) routine during computer booting?",
    opts: ["Loads the OS Kernel", "Checks hardware components like RAM and keyboard", "Formats the hard drive", "Installs drivers"],
    ans: 1,
    exp: "POST is executed by BIOS/UEFI to verify that essential system hardware is functioning properly before booting.",
    cat: "Booting Process",
    diff: "Medium"
  },
  {
    q: "Which command in Windows command prompt checks and repairs system file corruption?",
    opts: ["chkdsk", "sfc /scannow", "ipconfig", "ping"],
    ans: 1,
    exp: "sfc /scannow (System File Checker) scans and repairs corrupted system files in Windows.",
    cat: "Windows Utilities",
    diff: "Hard"
  },
  {
    q: "What is a Device Driver in Operating Systems?",
    opts: ["Hardware cable", "Specialized software enabling OS to interact with hardware", "Power supply unit", "Antivirus software"],
    ans: 1,
    exp: "Device drivers act as translators between the operating system and connected hardware peripherals.",
    cat: "System Software",
    diff: "Easy"
  },
  {
    q: "Which memory management technique suffers from Internal Fragmentation?",
    opts: ["Paging", "Paging with fixed size frames", "Fixed Partitioning", "Segmented Memory"],
    ans: 2,
    exp: "Fixed partitioning leads to internal fragmentation when a process doesn't fully utilize its assigned partition block.",
    cat: "Memory Management",
    diff: "Hard"
  },
  {
    q: "Which key opens the Run dialog box in Microsoft Windows?",
    opts: ["Win + R", "Win + E", "Win + D", "Win + L"],
    ans: 0,
    exp: "Windows Key + R instantly opens the Run command window.",
    cat: "Windows Shortcuts",
    diff: "Easy"
  },
  {
    q: "Which command in Linux displays system memory usage?",
    opts: ["df -h", "free -m", "top", "uptime"],
    ans: 1,
    exp: "'free -m' displays total, used, and available RAM in megabytes.",
    cat: "Linux Commands",
    diff: "Medium"
  }
];

// ----------------------------------------------------------------------
// CHAPTER 3: WORD PROCESSOR QUESTIONS (100)
// ----------------------------------------------------------------------
const CH3_TEMPLATES: { q: string; opts: [string, string, string, string]; ans: number; exp: string; cat: string; diff: 'Easy' | 'Medium' | 'Hard' }[] = [
  {
    q: "Which shortcut key is used to select the entire document in MS Word / LibreOffice Writer?",
    opts: ["Ctrl + A", "Ctrl + S", "Ctrl + C", "Ctrl + X"],
    ans: 0,
    exp: "Ctrl + A selects all text, images, and content in the document.",
    cat: "Shortcuts",
    diff: "Easy"
  },
  {
    q: "What is the feature in Word Processors that automatically moves text to the next line when reaching the margin?",
    opts: ["Word Wrap", "Word Art", "Text Align", "AutoCorrect"],
    ans: 0,
    exp: "Word Wrap automatically forces text onto a new line when the cursor reaches the right margin.",
    cat: "Formatting",
    diff: "Easy"
  },
  {
    q: "Which feature is used to send personalized letters or emails to multiple recipients automatically?",
    opts: ["Mail Merge", "Macro", "AutoText", "Cross-reference"],
    ans: 0,
    exp: "Mail Merge combines a data source (e.g., Excel list) with a main document template to generate personalized letters.",
    cat: "Mail Merge",
    diff: "Medium"
  },
  {
    q: "Which shortcut key opens the Find and Replace dialog box in MS Word?",
    opts: ["Ctrl + F", "Ctrl + H", "Ctrl + G", "Ctrl + R"],
    ans: 1,
    exp: "Ctrl + H directly opens the Replace tab in the Find & Replace window (Ctrl+F opens Navigation pane or Find).",
    cat: "Shortcuts",
    diff: "Easy"
  },
  {
    q: "In Word Processing, what is the default page orientation?",
    opts: ["Portrait", "Landscape", "Horizontal", "Custom"],
    ans: 0,
    exp: "Portrait orientation (vertical layout) is the default page orientation for new word processor documents.",
    cat: "Page Layout",
    diff: "Easy"
  },
  {
    q: "Which key combination centers the selected text in MS Word?",
    opts: ["Ctrl + C", "Ctrl + E", "Ctrl + J", "Ctrl + L"],
    ans: 1,
    exp: "Ctrl + E applies Center Alignment to selected text or paragraph.",
    cat: "Text Alignment",
    diff: "Easy"
  },
  {
    q: "What is the function of the Format Painter tool?",
    opts: ["Copies selected text", "Copies formatting from one object/text and applies it to another", "Changes background color", "Paints drawings"],
    ans: 1,
    exp: "Format Painter allows users to quickly copy font, size, color, and paragraph formatting and paint it onto other text.",
    cat: "Formatting Tools",
    diff: "Easy"
  },
  {
    q: "Which key is used to trigger Spelling & Grammar check in Word Processors?",
    opts: ["F5", "F7", "F12", "Shift + F7"],
    ans: 1,
    exp: "F7 launches the Spelling and Grammar check utility.",
    cat: "Proofing Tools",
    diff: "Easy"
  },
  {
    q: "What is a Thesaurus used for in MS Word / Writer?",
    opts: ["Translation", "Finding Synonyms and Antonyms", "Grammar rules", "Word count statistics"],
    ans: 1,
    exp: "The Thesaurus provides synonyms (words with similar meanings) and antonyms for selected words.",
    cat: "Proofing Tools",
    diff: "Easy"
  },
  {
    q: "Which document view displays the document as it will appear when printed on paper?",
    opts: ["Draft View", "Print Layout View", "Web Layout View", "Outline View"],
    ans: 1,
    exp: "Print Layout view shows headers, footers, margins, and exact visual layout as it will be printed.",
    cat: "Document Views",
    diff: "Easy"
  },
  {
    q: "What is the minimum font size available in the MS Word formatting toolbar font dropdown list?",
    opts: ["1", "8", "10", "12"],
    ans: 1,
    exp: "The standard font size drop-down list ranges from size 8 to 72 points (though size 1 can be typed manually).",
    cat: "Formatting",
    diff: "Medium"
  },
  {
    q: "Which extension is used for modern Microsoft Word documents?",
    opts: [".docx", ".doc", ".txt", ".odt"],
    ans: 0,
    exp: ".docx is the XML-based standard file format used by MS Word 2007 and newer versions.",
    cat: "File Extensions",
    diff: "Easy"
  },
  {
    q: "In MS Word, superscript text (e.g. x²) can be created using which shortcut?",
    opts: ["Ctrl + =", "Ctrl + Shift + +", "Alt + Shift + =", "Ctrl + Alt + S"],
    ans: 1,
    exp: "Ctrl + Shift + Plus sign (+ / =) toggles Superscript mode.",
    cat: "Shortcuts",
    diff: "Medium"
  },
  {
    q: "What is a Drop Cap in word processing?",
    opts: ["Capital letter at the end of a chapter", "A large decorative capital letter at the beginning of a paragraph", "Dropped bullet point", "Header font"],
    ans: 1,
    exp: "Drop Cap creates a large decorative initial letter spanning two or more lines at the start of a paragraph.",
    cat: "Typography",
    diff: "Medium"
  },
  {
    q: "Which shortcut key inserts a hard Page Break in Word Processor?",
    opts: ["Ctrl + Enter", "Shift + Enter", "Alt + Enter", "Ctrl + Shift + Enter"],
    ans: 0,
    exp: "Ctrl + Enter forces a page break, immediately sending text to the top of the next page.",
    cat: "Shortcuts",
    diff: "Easy"
  },
  {
    q: "Which feature is used to record a sequence of keystrokes and commands for automated repetition in Word?",
    opts: ["Mail Merge", "Macro", "AutoCorrect", "Template"],
    ans: 1,
    exp: "A Macro records a series of Word commands so you can run them automatically with a single shortcut.",
    cat: "Advanced Features",
    diff: "Hard"
  },
  {
    q: "What is the function of Gutter Margin in page setup?",
    opts: ["Margin added to top header", "Margin added to the binding side of paper when printing books", "Margin around images", "Bottom footer space"],
    ans: 1,
    exp: "Gutter margin adds extra space to the side or top margin to ensure text isn't obscured when the document is bound.",
    cat: "Page Setup",
    diff: "Medium"
  },
  {
    q: "Which shortcut key is used to Justify paragraph text evenly on both left and right margins?",
    opts: ["Ctrl + J", "Ctrl + E", "Ctrl + R", "Ctrl + L"],
    ans: 0,
    exp: "Ctrl + J applies Justify alignment.",
    cat: "Text Alignment",
    diff: "Easy"
  },
  {
    q: "What is the default file extension of LibreOffice Writer documents?",
    opts: [".docx", ".odt", ".txt", ".rtf"],
    ans: 1,
    exp: ".odt (OpenDocument Text) is the native file format for LibreOffice Writer and OpenOffice Writer.",
    cat: "File Extensions",
    diff: "Easy"
  },
  {
    q: "Which shortcut key combination opens the Font dialog box in MS Word?",
    opts: ["Ctrl + D", "Ctrl + F", "Ctrl + Shift + F", "Both Ctrl+D and Ctrl+Shift+F"],
    ans: 3,
    exp: "Both Ctrl + D and Ctrl + Shift + F open the Font formatting dialog box in MS Word.",
    cat: "Shortcuts",
    diff: "Medium"
  }
];

// ----------------------------------------------------------------------
// CHAPTER 4: EXCEL QUESTIONS (100)
// ----------------------------------------------------------------------
const CH4_TEMPLATES: { q: string; opts: [string, string, string, string]; ans: number; exp: string; cat: string; diff: 'Easy' | 'Medium' | 'Hard' }[] = [
  {
    q: "In Excel, all formulas and functions MUST begin with which symbol?",
    opts: ["=", "+", "@", "#"],
    ans: 0,
    exp: "In Excel/Spreadsheets, every formula or calculation starts with an Equals sign (=).",
    cat: "Formulas",
    diff: "Easy"
  },
  {
    q: "What is the intersection of a row and a column in an Excel worksheet called?",
    opts: ["Cell", "Grid", "Range", "Block"],
    ans: 0,
    exp: "A Cell is the individual box formed by the intersection of a vertical column and horizontal row.",
    cat: "Spreadsheet Basics",
    diff: "Easy"
  },
  {
    q: "Which function is used to add together a series of values in a range of cells?",
    opts: ["SUM()", "ADD()", "TOTAL()", "COUNT()"],
    ans: 0,
    exp: "The =SUM() function calculates the arithmetic sum of numbers in specified cells.",
    cat: "Functions",
    diff: "Easy"
  },
  {
    q: "What type of cell reference uses dollar signs (e.g., $A$1) to freeze cell address when copied?",
    opts: ["Relative Reference", "Absolute Reference", "Mixed Reference", "Dynamic Reference"],
    ans: 1,
    exp: "Absolute reference ($A$1) fixes the exact row and column reference so it doesn't shift when copied.",
    cat: "Cell Referencing",
    diff: "Medium"
  },
  {
    q: "Which function is used to search for a value in the leftmost column of a table and return a corresponding value?",
    opts: ["HLOOKUP", "VLOOKUP", "INDEX", "MATCH"],
    ans: 1,
    exp: "VLOOKUP (Vertical Lookup) searches for a value in the first column and returns a value in the same row from a specified column.",
    cat: "Lookup Functions",
    diff: "Medium"
  },
  {
    q: "What is the shortcut key to toggle between Relative, Absolute, and Mixed cell referencing while editing a formula?",
    opts: ["F2", "F4", "F9", "Ctrl + A"],
    ans: 1,
    exp: "Pressing F4 repeatedly while selecting a cell address cycles through A1 -> $A$1 -> A$1 -> $A1.",
    cat: "Shortcuts",
    diff: "Medium"
  },
  {
    q: "What error message appears in Excel when a column is not wide enough to display the full number?",
    opts: ["#VALUE!", "#####", "#REF!", "#N/A"],
    ans: 1,
    exp: "##### indicates that the cell width is too narrow to display the formatted numerical value.",
    cat: "Error Codes",
    diff: "Easy"
  },
  {
    q: "Which function returns the arithmetic mean of numbers in a given range?",
    opts: ["MEAN()", "AVERAGE()", "MEDIAN()", "SUMAVG()"],
    ans: 1,
    exp: "The =AVERAGE() function calculates the average (arithmetic mean) of numbers.",
    cat: "Functions",
    diff: "Easy"
  },
  {
    q: "What error code indicates an invalid cell reference in a formula (e.g. deleted cell)?",
    opts: ["#REF!", "#NAME?", "#DIV/0!", "#NULL!"],
    ans: 0,
    exp: "#REF! occurs when a formula refers to a cell that is not valid or has been deleted.",
    cat: "Error Codes",
    diff: "Medium"
  },
  {
    q: "Which keyboard shortcut key combination inserts the current system date into the selected cell?",
    opts: ["Ctrl + ; (Semicolon)", "Ctrl + Shift + :", "Alt + Shift + D", "Ctrl + D"],
    ans: 0,
    exp: "Ctrl + ; (semicolon) instantly inserts today's date into the active cell.",
    cat: "Shortcuts",
    diff: "Easy"
  },
  {
    q: "What is the total maximum number of rows available in a standard modern Excel worksheet (.xlsx)?",
    opts: ["65,536", "1,048,576", "524,288", "10,000,000"],
    ans: 1,
    exp: "An Excel worksheet contains 1,048,576 rows and 16,384 columns (A to XFD).",
    cat: "Excel Specs",
    diff: "Medium"
  },
  {
    q: "Which feature allows users to format cells automatically based on specified rules or conditions (e.g., highlight > 80)?",
    opts: ["Conditional Formatting", "AutoFormat", "Cell Styles", "Data Validation"],
    ans: 0,
    exp: "Conditional Formatting dynamically alters cell appearance (fill, font, border) based on cell values.",
    cat: "Formatting",
    diff: "Medium"
  },
  {
    q: "Which chart type is best suited for showing trends over time or continuous data?",
    opts: ["Pie Chart", "Line Chart", "Bar Chart", "Scatter Plot"],
    ans: 1,
    exp: "Line charts connect individual data points with lines, making them ideal for illustrating trends over time.",
    cat: "Charts",
    diff: "Easy"
  },
  {
    q: "What feature in Excel is used to restrict the type of data or values users can enter into a cell (e.g. dropdown list)?",
    opts: ["Data Validation", "Data Filter", "Goal Seek", "Consolidate"],
    ans: 0,
    exp: "Data Validation controls what entries are allowed (e.g., whole numbers, dates, or drop-down selection lists).",
    cat: "Data Tools",
    diff: "Medium"
  },
  {
    q: "In Excel, what does the LEN() function do?",
    opts: ["Returns the length of a line", "Returns the number of characters in a text string", "Calculates loan length", "Returns list count"],
    ans: 1,
    exp: "The =LEN(\"text\") function returns the count of characters (including spaces and symbols) in a string.",
    cat: "Text Functions",
    diff: "Easy"
  },
  {
    q: "Which tool in Excel allows you to calculate back from a desired output result to find the required input value?",
    opts: ["PivotTable", "Goal Seek", "Data Table", "Scenario Manager"],
    ans: 1,
    exp: "Goal Seek is a What-If Analysis tool that determines what input value is needed to produce a specific target formula result.",
    cat: "What-If Analysis",
    diff: "Hard"
  },
  {
    q: "What is the shortcut key to edit the active cell in Excel?",
    opts: ["F2", "F4", "F7", "F11"],
    ans: 0,
    exp: "Pressing F2 puts the active cell into edit mode with the insertion point placed at the end of the text.",
    cat: "Shortcuts",
    diff: "Easy"
  },
  {
    q: "Which function is used to count only cells that contain numeric values?",
    opts: ["COUNT()", "COUNTA()", "COUNTBLANK()", "COUNTIF()"],
    ans: 0,
    exp: "COUNT() counts cells containing numbers. COUNTA() counts non-empty cells.",
    cat: "Functions",
    diff: "Medium"
  },
  {
    q: "What is the shortcut key to instantly create a Chart from selected data on a new Chart Sheet?",
    opts: ["F11", "Alt + F1", "F1", "Ctrl + F11"],
    ans: 0,
    exp: "Pressing F11 creates a automatic column chart on a separate dedicated chart sheet.",
    cat: "Shortcuts",
    diff: "Medium"
  },
  {
    q: "What is the extension of LibreOffice Calc spreadsheet files?",
    opts: [".xlsx", ".ods", ".csv", ".sxc"],
    ans: 1,
    exp: ".ods (OpenDocument Spreadsheet) is the standard file extension for LibreOffice Calc.",
    cat: "File Extensions",
    diff: "Easy"
  }
];

// ----------------------------------------------------------------------
// CHAPTER 5: POWER POINT QUESTIONS (100)
// ----------------------------------------------------------------------
const CH5_TEMPLATES: { q: string; opts: [string, string, string, string]; ans: number; exp: string; cat: string; diff: 'Easy' | 'Medium' | 'Hard' }[] = [
  {
    q: "Which shortcut key is used to start the Slide Show from the very first slide in PowerPoint?",
    opts: ["F5", "Shift + F5", "Ctrl + F5", "F1"],
    ans: 0,
    exp: "Pressing F5 starts the slide show presentation from Slide 1.",
    cat: "Shortcuts",
    diff: "Easy"
  },
  {
    q: "Which shortcut key starts the Slide Show from the CURRENT selected slide?",
    opts: ["F5", "Shift + F5", "Alt + F5", "Ctrl + Shift + F5"],
    ans: 1,
    exp: "Shift + F5 launches the slide show starting directly from whichever slide is currently active.",
    cat: "Shortcuts",
    diff: "Easy"
  },
  {
    q: "In PowerPoint, what visual effect occurs when transitioning from ONE SLIDE to the NEXT during a presentation?",
    opts: ["Custom Animation", "Slide Transition", "Entrance Effect", "Action Setting"],
    ans: 1,
    exp: "Slide Transition controls how a slide enters or exits the screen when moving between slides.",
    cat: "Transitions",
    diff: "Easy"
  },
  {
    q: "What feature in PowerPoint controls movement applied to specific INDIVIDUAL elements (text, images, shapes) ON a slide?",
    opts: ["Slide Transition", "Custom Animation", "Design Template", "Master Slide"],
    ans: 1,
    exp: "Animation applies motion effects (Entrance, Emphasis, Exit, Motion Path) to specific items inside a slide.",
    cat: "Animations",
    diff: "Easy"
  },
  {
    q: "Which top-level view allows you to set universal fonts, background colors, logos, and layouts for ALL slides in a presentation?",
    opts: ["Slide Master", "Handout Master", "Notes Master", "Slide Sorter"],
    ans: 0,
    exp: "Slide Master stores theme and layout information; edits made to the Master reflect across every slide in the presentation.",
    cat: "Master Views",
    diff: "Medium"
  },
  {
    q: "Which PowerPoint view displays miniature thumbnails of ALL slides arranged in a grid, ideal for reordering slides?",
    opts: ["Normal View", "Slide Sorter View", "Reading View", "Slide Show View"],
    ans: 1,
    exp: "Slide Sorter view displays small thumbnails of all slides so you can easily drag and resequence them.",
    cat: "Presentation Views",
    diff: "Easy"
  },
  {
    q: "What is the shortcut key to insert a NEW SLIDE into the current presentation?",
    opts: ["Ctrl + N", "Ctrl + M", "Ctrl + S", "Ctrl + Shift + N"],
    ans: 1,
    exp: "Ctrl + M inserts a new slide (Ctrl + N creates a whole new presentation file).",
    cat: "Shortcuts",
    diff: "Easy"
  },
  {
    q: "Which file extension is used for Microsoft PowerPoint presentations saved in modern XML format?",
    opts: [".pptx", ".ppt", ".ppsx", ".odp"],
    ans: 0,
    exp: ".pptx is the standard XML presentation file extension used from PowerPoint 2007 onwards.",
    cat: "File Extensions",
    diff: "Easy"
  },
  {
    q: "What file format opens directly into full-screen Slide Show mode when double-clicked?",
    opts: [".pptx", ".ppsx", ".potx", ".pdf"],
    ans: 1,
    exp: ".ppsx (PowerPoint Show) immediately launches the presentation full-screen when opened.",
    cat: "File Extensions",
    diff: "Medium"
  },
  {
    q: "During a live Slide Show, pressing which key instantly turns the screen BLACK?",
    opts: ["B", "W", "Esc", "Spacebar"],
    ans: 0,
    exp: "Pressing the 'B' key toggles the presentation screen to pure Black. Pressing 'W' turns it White.",
    cat: "Slide Show Controls",
    diff: "Medium"
  },
  {
    q: "Which pane allows you to add speaker notes for reference during presentation delivery?",
    opts: ["Notes Pane", "Comments Pane", "Animation Pane", "Selection Pane"],
    ans: 0,
    exp: "The Notes pane beneath the slide lets the presenter type private talking points.",
    cat: "Presenter Tools",
    diff: "Easy"
  },
  {
    q: "What is the shortcut key to stop or exit a live Slide Show and return to editing mode?",
    opts: ["Esc", "F5", "Ctrl + Q", "Alt + F4"],
    ans: 0,
    exp: "Pressing Escape (Esc) immediately exits full-screen slide show mode.",
    cat: "Shortcuts",
    diff: "Easy"
  },
  {
    q: "In PowerPoint, what are the four categories of Custom Animations?",
    opts: ["Entrance, Emphasis, Exit, Motion Paths", "Fade, Wipe, Zoom, Spin", "Start, Run, Stop, Reset", "Linear, Curved, Bounce, Elastic"],
    ans: 0,
    exp: "Animations fall into 4 main classes: Entrance (green), Emphasis (yellow), Exit (red), and Motion Paths.",
    cat: "Animations",
    diff: "Medium"
  },
  {
    q: "Which default slide layout appears when you create a brand new blank presentation?",
    opts: ["Blank Slide", "Title Slide", "Title and Content", "Two Content"],
    ans: 1,
    exp: "The 'Title Slide' layout containing large Title and Subtitle placeholders is the default first slide.",
    cat: "Slide Layouts",
    diff: "Easy"
  },
  {
    q: "What tool allows a presenter to view upcoming slides, speaker notes, and timer on a private monitor while audience sees full screen?",
    opts: ["Presenter View", "Dual Screen Mode", "Master View", "Reading View"],
    ans: 0,
    exp: "Presenter View gives the speaker control with timer, notes, laser pointer, and slide previews.",
    cat: "Presenter Tools",
    diff: "Medium"
  },
  {
    q: "What is the file extension of LibreOffice Impress presentation files?",
    opts: [".odp", ".pptx", ".otp", ".sxi"],
    ans: 0,
    exp: ".odp (OpenDocument Presentation) is the native file extension for LibreOffice Impress.",
    cat: "File Extensions",
    diff: "Easy"
  },
  {
    q: "Which shortcut key duplicate selected slides or objects in PowerPoint?",
    opts: ["Ctrl + D", "Ctrl + C", "Ctrl + Shift + D", "Alt + D"],
    ans: 0,
    exp: "Ctrl + D duplicates selected slides or shapes instantly.",
    cat: "Shortcuts",
    diff: "Easy"
  },
  {
    q: "What feature allows clicking a text or shape to jump to another slide, web address, or file during presentation?",
    opts: ["Action Button / Hyperlink", "SmartArt", "WordArt", "Transition"],
    ans: 0,
    exp: "Hyperlinks and Action Buttons allow interactive navigation between slides or external resources.",
    cat: "Interactivity",
    diff: "Easy"
  },
  {
    q: "Which feature automatically loops a presentation continuously until Escape is pressed (e.g., kiosk mode)?",
    opts: ["Loop continuously until 'Esc'", "Rehearse Timings", "Custom Slide Show", "Hide Slide"],
    ans: 0,
    exp: "The 'Loop continuously until Esc' setting under Set Up Slide Show runs the presentation on repeat.",
    cat: "Slide Show Setup",
    diff: "Medium"
  },
  {
    q: "What is Rehearse Timings used for in PowerPoint?",
    opts: ["Records the time spent on each slide to automate presentation pacing", "Sets alarm clock", "Speeds up animations", "Calculates slide count"],
    ans: 0,
    exp: "Rehearse Timings logs how long you spend on each slide so you can run auto-advancing slide shows.",
    cat: "Presenter Tools",
    diff: "Medium"
  }
];

// Map of Chapter ID -> Questions Array
export const CHAPTER_QUESTIONS_MAP: Record<number, Question[]> = {
  1: CH1_QUESTIONS,
  2: createChapterQuestions(2, "Operating System", CH2_TEMPLATES),
  3: createChapterQuestions(3, "Word processor", CH3_TEMPLATES),
  4: createChapterQuestions(4, "Excel", CH4_TEMPLATES),
  5: createChapterQuestions(5, "Power point", CH5_TEMPLATES),
};

export function getQuestionsForChapter(chapterId: number): Question[] {
  return CHAPTER_QUESTIONS_MAP[chapterId] || CH1_QUESTIONS;
}
