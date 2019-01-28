import eighteenthpresident from './images/MC/18th/president.png';
import eighteenthvpwelfare from './images/MC/18th/vpwelfare.png';
import eighteenthvpcommlife from './images/MC/18th/vpcommlife.png';
import eighteenthacaddirector from './images/MC/18th/acaddirector.png';
import eighteenthhonfinsec from './images/MC/18th/honfinsec.png';
import eighteenthhongensec from './images/MC/18th/hongensec.png';
import eighteenthfopdirector from './images/MC/18th/fopdirector.png';

import sixteenthpresident from './images/MC/16th/president.jpg';
import sixteenthvpwelfare from './images/MC/16th/vpwelfare.jpg';
import sixteenthvpcommlife from './images/MC/16th/vpcommlife.jpg';
import sixteenthhonfinsec from './images/MC/16th/honfinsec.jpg';
import sixteenthhongensec from './images/MC/16th/hongensec.jpg';
import sixteenthfopdirector from './images/MC/16th/fopdirector.jpg';

import seventeethpresident from './images/MC/17th/president.jpg';
import seventeethvpwelfare from './images/MC/17th/vpwelfare.jpg';
import seventeethvpcommlife from './images/MC/17th/vpcommlife.jpg';
import seventeethhonfinsec from './images/MC/17th/honfinsec.jpg';
import seventeethhongensec from './images/MC/17th/hongensec.jpg';
import seventeethfopdirector from './images/MC/17th/fopdirector.jpg';

import presidentComm from './images/USCommitees/advisory.jpg';
import vpwelfareComm from './images/USCommitees/welfare.jpg';
import vpcommlifeComm from './images/USCommitees/commlife.jpg';
import academicComm from './images/USCommitees/academic.jpg';
import honfinsecComm from './images/USCommitees/finance.jpg';
import hongensecComm from './images/USCommitees/secretariat.jpg';
import fopdirectorComm from './images/USCommitees/fop.jpg';

import housecapts from './images/USCommitees/housecapts.jpg';
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
      image: seventeethpresident,
    },
    {
      name: "WOO Qi Yun",
      title: "Vice-President (Welfare)",
      image: seventeethvpwelfare,
    },
    {
      name: "TEE Shu Yun",
      title: "Vice-President (Community Life)",
      image: seventeethvpcommlife,
    },
    {
      name: "Jeremy JEE",
      title: "Honorary General Secretary",
      image: seventeethhongensec,
    },
    {
      name: "Melissa TANG",
      title: "Honorary Financial Secretary",
      image: seventeethhonfinsec,
    },
    {
      name: "ZHANG Quyi",
      title: "Freshmen Orientation Project Director",
      image: seventeethfopdirector,
    }
  ],
  "18th" :
  [
    {
      name: "Jeremy JEE",
      title: "President",
      image: eighteenthpresident,
    },
    {
      name: "TEOH Xin Yi",
      title: "Vice-President (Community Life)",
      image: eighteenthvpcommlife,
    },
    {
      name: "Sanchita SACHDEV",
      title: "Vice-President (Welfare)",
      image: eighteenthvpwelfare,
    },
    {
      name: "CHOW Kit Ying",
      title: "Academic Director",
      image: eighteenthacaddirector,
    },
    {
      name: "CHIK Cheng Yao",
      title: "Honorary General Secretary",
      image: eighteenthhongensec,
    },
    {
      name: "QUEK Siying",
      title: "Honorary Financial Secretary",
      image: eighteenthhonfinsec,
    },
    {
      name: "Charmaine GOH",
      title: "Freshmen Orientation Project Director",
      image: eighteenthfopdirector,
    }
  ]
};

export const uscCommittees = [
  {
    name: "Advisory",
    headedBy: "Jeremy Jee, President",
    image: presidentComm,
    teams: [{
      name: "Communications Team",
      members: "Annina Zhang (Communications Secretary), Quah Yan Hsien, Teoh Xin Yi & Tho Jia Yi"
    },
    {
      name: "Alumni Relations Team",
      members: "Chan Qiu Qing & Roxanne Kwek"
    },
    {
      name: "USP Think Tank",
      members: "Jerald Lim (Support Systems), Eric Toh (Ragxit), Sean Auyok (Toho), Darren Lim, Jazreel Low, Myat TK & Joyce Yeo"
    }]
  },
  {
    name: "Community Life",
    headedBy: "Teoh Xin Yi, Vice-President (Community Life)",
    image: vpcommlifeComm,
    teams: [{
      name: "Deputy Director",
      members: "Sean Heng"
    },
    {
      name: "Sports Directorate",
      members: "Chua Jiin-Linn (Director), Sebastian Gwek & Ashley Goh"
    },
    {
      name: "Cultural & Arts Directorate",
      members: "Samantha Rin (Director), Xiang Min (Director), Taira Robles (Dinner Committee I/C), Preeteashwari, Soh Kai Xin, Yan Jean Lai"
    },
    {
      name: "Operations & Logistics Directors",
      members: "Eric Toh & Jazreel Low"
    },
    {
      name: "IG & USProject Coordinators",
      members: "Sean Heng (Non-Sports), Chua Jiin-Linn (Sports) & Teoh Xin Yi (USProjects)"
    },
    {
      name: "GUI Coordinators",
      members: "Cheryl Tan, Jane Ang & Hsi Ning (Community Service)"
    }]
  },
  {
    name: "Student Welfare",
    headedBy: "Sanchita Sachdev, Vice-President (Welfare)",
    image: vpwelfareComm,
    teams: [{
      name: "Welfare Projects Team",
      members: "Charmaine Lee (Director), Stella Soon (Deputy Director), Valeria Poh (Deputy Director), Andrea Chua, Nur Haziqah Mohd Yazib, Li Xin Foo, Kai Sen Chong, Kia Sim Kathy Tan, Tabitha Lee"
    },
    {
      name: "Residential Welfare Team",
      members: "Darren Lim & Raivat"
    },
    {
      name: "Inter-House Coordinators",
      members: "Arnold Teo & Ng Jingrong"
    },
    {
      name: "Finance and Sponsorship",
      members: "Archana"
    }]
  },
  {
    name: "Academic",
    headedBy: "Chow Kit Ying, Academic Director",
    image: academicComm,
    teams: [{
      name: "Deputy Academic Directors",
      members: "Annina Zhang & Yan Chun"
    },
    {
      name: "External Liaison Officers",
      members: "Jazreel Low & Chaitanya"
    },
    {
      name: "Internal Liaison Officers",
      members: "Mark Goh, Mitchell, Tomoe Suzuki, Shuin Hern & Jasper"
    },
    {
      name: "Data and Communications Coordinator",
      members: "Nur Ridhuan, Zhu Tongyao & Jevon Neo"
    }]
  },
  {
    name: "Secretariat",
    headedBy: "Chik Cheng Yao, Honorary General Secretary",
    image: hongensecComm,
    teams: [{
      name: "Spaces Design Team",
      members: "Ng Hui Ren (Lead), Soh Kai Yuan, Cheryl Ng, Andrea Tan, Joyce Yeo & Daniel Ho"
    },
    {
      name: "Visual Design Team",
      members: "Soh Kai Yuan (Lead), Andrea Tan, Zhang Yiyue, Anlydia, Xiang Min, Foo Yong Qing, Yan Chun, Jen Chik, Jasmine Liew"
    },
    {
      name: "Technology Development Team",
      members: "Yuan Yuchuan (Internet of Things), Ahan Gupta (Website), Sean Ng & Chaitanya (Cinnabot) & Hong Shao Yang (Lobby Display)"
    }]
  },
  {
    name: "Finance",
    headedBy: "Quek Siying, Honorary Financial Secretary",
    image: honfinsecComm,
    teams: [{
      name: "Deputy Honorary Financial Secretary",
      members: "Daniel Chin Kiat Lam"
    },
    {
      name: "Business Development & Marketing Executives (External)",
      members: "Jong-Gang (Ayden) Bae (Lead), Tay Ming Kiat (Lead), Wee Su-Ann & Samantha Rin (Welfare)"
    },
    {
      name: "Business Development & Marketing Executives (Internal)",
      members: "Alvin Choo (Lead), Wee Su-Ann, Archana"
    },
    {
      name: "Financial Attaches",
      members: "Wee Su-Ann (Secretariat & Public Relations), Archana (Welfare) & Mandy Wang (Community Life)"
    }]
  },
  {
    name: "Freshmen Orientation",
    headedBy: "Charmaine Goh, Freshmen Orientation Director",
    image: fopdirectorComm,
    teams: [{
      name: "Deputy Director",
      members: "Cheryl Ng"
    },
    {
      name: "Orientation Camp (O'Camp)",
      members: "Tarandeep Bardh (Project Director), Amanda Ho (Vice Project Director), Dinise Chng, Tanya Ang, Foo Lixin, Lin Yuan"
    },
    {
      name: "Orientation Week (O'Week)",
      members: "Lee Chan Wai (Project Director), Tiffany Tee (Vice Project Director), Valerie Chua, Yip Sze Kay"
    },
    {
      name: "Events",
      members: "Bernice Lim (Project Director), Andrea Chua, Chloe Ng"
    },
    {
      name: "Batch Project",
      members: "Charlotte The (Project Director), Haziqah (Vice Project Director), Lee Zhi Xuan, Manita Goh"
    },
    {
      name: "Finance",
      members: "Valary Lim (Project Director), Chloe Lee, Mandy Wang, Tay Ming Kiat"
    },
    {
      name: "Public Relations",
      members: "Chan Qiu Qing (Project Director)"
    },
    {
      name: "Creative",
      members: "Soh Kai Xin (Project Director), Foo Yong Qing"
    },
    {
      name: "Operations",
      members: "Alvin Choo (Project Director), Jerlyn Ng, Chloe Lee, Claudine Tan"
    }]
  }
]

export const houseCommittees = [
  {
    name: "Ursaia",
    image: ursaia,
    members: [
      {
        name: "Wong Wen Wei",
        title: "House Captain"
      },
      {
        name: "Ryan Tan Wei Young",
        title: "Vice House Captain"
      },
      {
        name: "Manita Goh",
        title: "Chief Orientation Group Leader"
      },
      {
        name: "Ong Sing Huat, Jonathan",
        title: "Vice Chief Orientation Group Leader"
      }
    ]
  },
  {
    name: "Nocturna",
    image: nocturna,
    members: [
      {
        name: "Ahmed Bahajjaj",
        title: "House Captain"
      },
      {
        name: "Qian Zihan",
        title: "Vice House Captain"
      },
      {
        name: "Taha Jailani",
        title: "Chief Orientation Group Leader"
      },
      {
        name: "Venny Lewis",
        title: "Vice Chief Orientation Group Leader"
      }
    ]
  },
  {
    name: "Ianthe",
    image: ianthe,
    members: [
      {
        name: "Teow Junhao",
        title: "House Captain"
      },
      {
        name: "Lim Qian Hui",
        title: "Vice House Captain"
      },
      {
        name: "Rachel Huang",
        title: "Chief Orientation Group Leader"
      },
      {
        name: "Ajeya Mantri",
        title: "Vice Chief Orientation Group Leader"
      }
    ]
  },
  {
    name: "Triton",
    image: triton,
    members: [
      {
        name: "Cheong Siu Hong",
        title: "House Captain"
      },
      {
        name: "Vanessa Leong Kar Mun",
        title: "Vice House Captain"
      },
      {
        name: "Jeslyn Ong Ting Ting",
        title: "Chief Orientation Group Leader"
      },
      {
        name: "Ahmad Zaki Bin Yazid",
        title: "Vice Chief Orientation Group Leader"
      }
    ]
  },
  {
    name: "Ankaa",
    image: ankaa,
    members: [
      {
        name: "Peng Yun Ting",
        title: "House Captain"
      },
      {
        name: "Marion Kua Xin Yi",
        title: "Vice House Captain"
      },
      {
        name: "Dhameem Ansar S/O Bathusha",
        title: "Chief Orientation Group Leader"
      },
      {
        name: "Mohamad Rafi Bin Kamsani Chia",
        title: "Vice Chief Orientation Group Leader"
      }
    ]
  },
  {
    name: "Saren",
    image: saren,
    members: [
      {
        name: "Lam Wei Qi Vicki",
        title: "House Captain"
      },
      {
        name: "Lee Wei Ren Matthew",
        title: "Vice House Captain"
      },
      {
        name: "Tho Jia Yi",
        title: "Chief Orientation Group Leader"
      },
      {
        name: "Ooi Wen Ting",
        title: "Vice Chief Orientation Group Leader"
      }
    ]
  }
]
