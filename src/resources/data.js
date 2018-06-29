import president from './images/MC/president.jpg';
import vpwelfare from './images/MC/vpwelfare.jpg';
import vpcommlife from './images/MC/vpcommlife.jpg';
import honfinsec from './images/MC/honfinsec.jpg';
import hongensec from './images/MC/hongensec.jpg';
import fopdirector from './images/MC/fopdirector.jpg';

import sixteenthpresident from './images/MC/16th/president.jpg';
import sixteenthvpwelfare from './images/MC/16th/vpwelfare.jpg';
import sixteenthvpcommlife from './images/MC/16th/vpcommlife.jpg';
import sixteenthhonfinsec from './images/MC/16th/honfinsec.jpg';
import sixteenthhongensec from './images/MC/16th/hongensec.jpg';
import sixteenthfopdirector from './images/MC/16th/fopdirector.jpg';

import presidentComm from './images/USCommitees/publicrelations.jpg';
import vpwelfareComm from './images/USCommitees/welfare.jpg';
import vpcommlifeComm from './images/USCommitees/commlife.jpg';
import honfinsecComm from './images/USCommitees/finance.jpg';
import hongensecComm from './images/USCommitees/secretariat.jpg';
import fopdirectorComm from './images/USCommitees/fop.jpg';

import ursaia from './images/House/Ursaia.jpg';
import nocturna from './images/House/Nocturna.jpg';
import ianthe from './images/House/Ianthe.jpg';
import triton from './images/House/Triton.jpg';
import ankaa from './images/House/Ankaa.jpg';
import saren from './images/House/Saren.jpg';

import { amphitheatre, chatterbox, themeRoom1, themeRoom2 } from './images';

export const timeIntervals = 30

export const eventTypes = ["Academic", "Community Life", "Welfare", "Others"];
export const footerText = "© Copyright 2018. All Rights Reserved. NUS Students' University Scholars Club"

export function getEventTypeID(event) {
  switch(event) {
    case eventTypes[0]:
      return 0
    case eventTypes[1]:
      return 1
    case eventTypes[2]:
      return 2
    case eventTypes[3]:
      return 3
    default:
      return -1
  }
}

export const spaces = [
  {
    name: "Amphitheatre",
    shortName: "Amphi",
    image: amphitheatre,
  }, {
    name: "Chatterbox",
    shortName: "Chatter",
    image: chatterbox,
  }, {
    name: "Theme Room 1",
    shortName: "TR1",
    image: themeRoom1,
  }, {
    name: "Theme Room 2",
    shortName: "TR2",
    image: themeRoom2,
  }
]

export const defaultTypeColor = "black"

export const typeToColor = {
  'Academic': 'dodgerblue'
}

export function getSpaceID(space) {
  switch(space) {
    case "Amphitheatre":
      return 0
    case "Chatterbox":
      return 1
    case "Theme Room 1":
      return 2
    case "Theme Room 2":
      return 3
    default:
      return -1
  }
}

export const mcMembers = {
  "16th" :
  [
    {
      name: "CHEAH Wen Jie",
      title: "President",
      image: sixteenthpresident,
    },
    {
      name: "Hillary TAN",
      title: "Vice-President (Welfare)",
      image: sixteenthvpwelfare,
    },
    {
      name: "Devesh NARAYANAN",
      title: "Vice-President (Community Life)",
      image: sixteenthvpcommlife,
    },
    {
      name: "HONG Shao Yang",
      title: "Honorary General Secretary",
      image: sixteenthhongensec,
    },
    {
      name: "Edwin Luke WEE",
      title: "Honorary Financial Secretary",
      image: sixteenthhonfinsec,
    },
    {
      name: "WOO Qiyun",
      title: "Freshmen Orientation Project Director",
      image: sixteenthfopdirector,
    }
  ],
  "17th" :
  [
    {
      name: "THAM Jun Han",
      title: "President",
      image: president,
    },
    {
      name: "WOO Qi Yun",
      title: "Vice-President (Welfare)",
      image: vpwelfare,
    },
    {
      name: "TEE Shu Yun",
      title: "Vice-President (Community Life)",
      image: vpcommlife,
    },
    {
      name: "Jeremy JEE",
      title: "Honorary General Secretary",
      image: hongensec,
    },
    {
      name: "Melissa TANG",
      title: "Honorary Financial Secretary",
      image: honfinsec,
    },
    {
      name: "ZHANG Quyi",
      title: "Freshmen Orientation Project Director",
      image: fopdirector,
    }
  ]
};

export const uscCommittees = [
  {
    name: "Public Relations",
    headedBy: "Tham Jun Han, President",
    image: presidentComm,
    teams: [{
      name: "Communications Team",
      members: "Royston Chua (Communications Secretary), Koh Kai Qian & Nur Ridhuan"
    },
    {
      name: "Alumni Relations Team",
      members: "Shien Hian Lim & Marcus Ng"
    }]
  },
  {
    name: "Student Welfare",
    headedBy: "Woo Qiyun, Vice-President (Welfare)",
    image: vpwelfareComm,
    teams: [{
      name: "Welfare Projects Team",
      members: "Wan Nur Syafiqa B Syed Yusoff (Director), Charmaine Lee (Deputy Director), Sanchita Sachdev (Deputy Director), Ong Ci Wen, Jaymee Mariano Justiniano, Melanie Chng, Wee Su-Ann, Jasmie Liew, Kagen Lim, Jade Ng & Lee Chun Min"
    },
    {
      name: "Academic Team",
      members: "Atharv Joshi (Director), Melvin Soh, Deter Thng, Devesh Narayanan & Loh Xiang Bin"
    },
    {
      name: "Residential Welfare Team",
      members: "Wang Chiew Hui (Spaces Director), Pang Chee Him (Dining Hall Director), Seah Wan Yu & Philina Lai"
    },
    {
      name: "House Captains Team",
      members: "Gerald Seet (Ursaia), Kelvin Neo (Nocturna), Engracia Loh (Ianthe), Myat Thu Kyaw (Triton), Ng Jingrong (Ankaa), Arnold Teo (Saren) with Tan Kit Yung (Coordinating Director - Interhouse Events)"
    }]
  },
  {
    name: "Community Life",
    headedBy: "Tee Shu Yun, Vice-President (Community Life)",
    image: vpcommlifeComm,
    teams: [{
      name: "Deputy Directors",
      members: "Tan Yan Tyng & Joyce Foo"
    },
    {
      name: "Sports Director",
      members: "Jeremy Png"
    },
    {
      name: "IG Coordinators",
      members: "Edward Goh (Sports) & Andrea Tan (Non-Sports)"
    },
    {
      name: "GUI Coordinators",
      members: "Kathy Tan (Social, Cultural & Sports), Jazreel Low (Social, Cultural & Sports), Loh Xiang Bin (Welfare & Acad) & Teoh Xin Yi (Community Service)"
    }]
  },
  {
    name: "Secretariat",
    headedBy: "Jeremy Jee, Honorary General Secretary",
    image: hongensecComm,
    teams: [{
      name: "Spaces Design Team",
      members: "Matthew Lee (Lead), Chia Yu Xuan (Lead), Chu Khoon Hwa & Andrea Tan"
    },
    {
      name: "Visual Design Team",
      members: "Carina Lim (Lead), Vandhana Jeyaram, Dong Yunfan, & Andrea Tan"
    },
    {
      name: "Technology Development Team",
      members: "Yuan Yuchuan (Lead), Varun Patro, Ahan Gupta, Sean Ng, Low Yew Woei & Chik Cheng Yao"
    },
    {
      name: "Operations Manager",
      members: "Gwyneth Cheng"
    }]
  },
  {
    name: "Finance",
    headedBy: "Melissa Tang, Honorary Financial Secretary",
    image: honfinsecComm,
    teams: [{
      name: "Deputy Honorary Financial Secretary",
      members: "Maria Teresa Boey"
    },
    {
      name: "Business Development Executives",
      members: "Low Yew Woei (External) & Rachel Thomas (Internal)"
    },
    {
      name: "Marketing Executives",
      members: "Ng Shi Kai & Michelle Quek"
    },
    {
      name: "Financial Attaches",
      members: "Quek Siying (Secretariat & Public Relations), Pang Chee Him (Welfare) & Andrea Chou Lim (Community Life)"
    }]
  },
  {
    name: "Freshmen Orientation",
    headedBy: "Zhang Quyi, Freshmen Orientation Director",
    image: fopdirectorComm,
    teams: [{
      name: "Deputy Director",
      members: "Annina Zhang"
    },
    {
      name: "Directors",
      members: "Jazreel Low (Finance), Joyce Yeo (Creative), Merilynn Seng (Public Relations) & Jesmine Woon (Operations)"
    },
    {
      name: "Project Directors",
      members: "Beatrice Low (Camp), Jenn (O’Week), Kathy Tan (Events), Jadyn Teo (Batch Project) & Teoh Xinyi (Community Engagement)"
    }]
  }
]

export const houseCommittees = [
  {
    name: "Ursaia",
    image: ursaia,
    members: [
      {
        name: "Gerald Seet",
        title: "House Captain"
      },
      {
        name: "Pratyay Jaidev",
        title: "Vice House Captain"
      },
      {
        name: "Taira Robles",
        title: "Chief Orientation Group Leader"
      },
      {
        name: "Samantha Rin",
        title: "Vice Chief Orientation Group Leader"
      }
    ]
  },
  {
    name: "Nocturna",
    image: nocturna,
    members: [
      {
        name: "Kelvin Neo",
        title: "House Captain"
      },
      {
        name: "Oh Pei Shan",
        title: "Vice House Captain"
      },
      {
        name: "Gordon Chua",
        title: "Chief Orientation Group Leader"
      },
      {
        name: "Lee Weiqi",
        title: "Vice Chief Orientation Group Leader"
      }
    ]
  },
  {
    name: "Ianthe",
    image: ianthe,
    members: [
      {
        name: "Engracia Loh Qian Ying",
        title: "House Captain"
      },
      {
        name: "Chik Cheng Yao",
        title: "Vice House Captain"
      },
      {
        name: "Clara Lim Pei Ying",
        title: "Chief Orientation Group Leader"
      },
      {
        name: "Yap Joon Kiat Mitchell",
        title: "Vice Chief Orientation Group Leader"
      }
    ]
  },
  {
    name: "Triton",
    image: triton,
    members: [
      {
        name: "Myat Thu Kyaw",
        title: "House Captain"
      },
      {
        name: "Lee Chun Min",
        title: "Vice House Captain"
      },
      {
        name: "Chng Hui Ru Melanie",
        title: "Chief Orientation Group Leader"
      },
      {
        name: "Nikita Gupta",
        title: "Vice Chief Orientation Group Leader"
      }
    ]
  },
  {
    name: "Ankaa",
    image: ankaa,
    members: [
      {
        name: "Ng Jingrong",
        title: "House Captain"
      },
      {
        name: "Nadine Quah",
        title: "Vice House Captain"
      },
      {
        name: "Mohd Asyraf Zaidi",
        title: "Chief Orientation Group Leader"
      },
      {
        name: "Kew Yu Jing",
        title: "Vice Chief Orientation Group Leader"
      }
    ]
  },
  {
    name: "Saren",
    image: saren,
    members: [
      {
        name: "Teo Kun Ho Arnold",
        title: "House Captain"
      },
      {
        name: "Teo Xi Hui",
        title: "Vice House Captain"
      },
      {
        name: "Jasmine Liew Yee Theng",
        title: "Chief Orientation Group Leader"
      },
      {
        name: "Cheung Wai Him Samantha",
        title: "Vice Chief Orientation Group Leader"
      }
    ]
  }
]
