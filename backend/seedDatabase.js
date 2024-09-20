const mongoose = require('mongoose');
const Question = require('./models/Question');

mongoose.connect('mongodb://mongo:27017/ccna_quiz', { useNewUrlParser: true, useUnifiedTopology: true });

const seedQuestions = [
  {
    question: "What is the purpose of OSPF?",
    options: [
      "Network Address Translation",
      "Dynamic routing protocol",
      "Firewall configuration",
      "VLAN management"
    ],
    correctAnswer: 1,
    explanation: "OSPF (Open Shortest Path First) is a dynamic routing protocol used to find the best path between the source and destination router using its own SPF algorithm."
  },
  {
    question: "Which layer of the OSI model is responsible for logical addressing?",
    options: [
      "Physical Layer",
      "Data Link Layer",
      "Network Layer",
      "Transport Layer"
    ],
    correctAnswer: 2,
    explanation: "The Network Layer (Layer 3) of the OSI model is responsible for logical addressing, such as IP addresses, and routing between different networks."
  },
  {
    question: "What is the maximum number of IP addresses available in a /24 subnet?",
    options: [
      "128",
      "256",
      "254",
      "255"
    ],
    correctAnswer: 2,
    explanation: "A /24 subnet has 8 host bits, which allows for 2^8 = 256 total addresses. However, the first and last addresses are reserved for network and broadcast addresses, leaving 254 usable IP addresses."
  },
  {
    question: "Which protocol is used to automatically assign IP addresses to devices on a network?",
    options: [
      "HTTP",
      "FTP",
      "DHCP",
      "SMTP"
    ],
    correctAnswer: 2,
    explanation: "DHCP (Dynamic Host Configuration Protocol) is used to automatically assign IP addresses, subnet masks, default gateways, and other network configuration to devices on a network."
  },
  {
    question: "What is the purpose of a VLAN?",
    options: [
      "To increase network speed",
      "To segment a network into multiple broadcast domains",
      "To connect to the internet",
      "To encrypt network traffic"
    ],
    correctAnswer: 1,
    explanation: "VLANs (Virtual Local Area Networks) are used to logically segment a network into multiple broadcast domains, improving network performance and security by isolating traffic between different groups of devices."
  }
];

async function seedDB() {
  await Question.deleteMany({});
  await Question.insertMany(seedQuestions);
  console.log('Database seeded!');
  mongoose.connection.close();
}

seedDB();
