import sixteenthpresident from './images/MC/16th/president.jpg'
import sixteenthvpwelfare from './images/MC/16th/vpwelfare.jpg'
import sixteenthvpcommlife from './images/MC/16th/vpcommlife.jpg'
import sixteenthhonfinsec from './images/MC/16th/honfinsec.jpg'
import sixteenthhongensec from './images/MC/16th/hongensec.jpg'
import sixteenthfopdirector from './images/MC/16th/fopdirector.jpg'

import seventeethpresident from './images/MC/17th/president.jpg'
import seventeethvpwelfare from './images/MC/17th/vpwelfare.jpg'
import seventeethvpcommlife from './images/MC/17th/vpcommlife.jpg'
import seventeethhonfinsec from './images/MC/17th/honfinsec.jpg'
import seventeethhongensec from './images/MC/17th/hongensec.jpg'
import seventeethfopdirector from './images/MC/17th/fopdirector.jpg'

import eighteenthpresident from './images/MC/18th/president.png'
import eighteenthvpwelfare from './images/MC/18th/vpwelfare.png'
import eighteenthvpcommlife from './images/MC/18th/vpcommlife.png'
import eighteenthacaddirector from './images/MC/18th/acaddirector.png'
import eighteenthhonfinsec from './images/MC/18th/honfinsec.png'
import eighteenthhongensec from './images/MC/18th/hongensec.png'
import eighteenthfopdirector from './images/MC/18th/fopdirector.png'

import nineteenthpresident from './images/MC/19th/president.png'
import nineteenthvpwelfare from './images/MC/19th/vpwelfare.png'
import nineteenthvpcommlife from './images/MC/19th/vpcommlife.png'
import nineteenthhonfinsec from './images/MC/19th/honfinsec.png'
import nineteenthhongensec from './images/MC/19th/hongensec.png'
import nineteenthfopdirector from './images/MC/19th/fopdirector.png'

import twentiethpresident from './images/MC/20th/president.png'
import twentiethvpwelfare from './images/MC/20th/vpwelfare.png'
import twentiethvpcommlife from './images/MC/20th/vpcommlife.png'
import twentiethhonfinsec from './images/MC/20th/honfinsec.png'
import twentiethhongensec from './images/MC/20th/hongensec.png'
import twentiethacaddirector from './images/MC/20th/acaddirector.png'
import twentiethfopdirector from './images/MC/20th/fopdirector.png'

import twentyfirstpresident from './images/MC/21st/president.jpg'
import twentyfirstvpwelfare from './images/MC/21st/vpwelfare.jpg'
import twentyfirstvpcommlife from './images/MC/21st/vpcommlife.jpg'
import twentyfirsthonfinsec from './images/MC/21st/honfinsec.jpg'
import twentyfirsthongensec from './images/MC/21st/hongensec.jpg'
import twentyfirstacaddirector from './images/MC/21st/acaddirector.jpg'
import twentyfirstfopdirector from './images/MC/21st/fopdirector.jpg'

import presidentComm from './images/USCommitees/advisory.png'
import vpwelfareComm from './images/USCommitees/welfare.png'
import vpcommlifeComm from './images/USCommitees/commlife.png'
import academicComm from './images/USCommitees/academic.png'
import honfinsecComm from './images/USCommitees/finance.png'
import hongensecComm from './images/USCommitees/secretariat.png'
import fopdirectorComm from './images/USCommitees/fop.png'

import ursaia from './images/House/Ursaia.jpg'
import nocturna from './images/House/Nocturna.jpg'
import ianthe from './images/House/Ianthe.jpg'
import triton from './images/House/Triton.jpg'
import ankaa from './images/House/Ankaa.jpg'
import saren from './images/House/Saren.jpg'

import { amphitheatre, chatterbox, themeRoom1, themeRoom2 } from './images'

export const timeIntervals = 30

export const eventTypes = ['Academic', 'Community Life', 'Welfare', 'Others']
export const footerText =
  "© Copyright 2018. All Rights Reserved. NUS Students' University Scholars Club"

export function getEventTypeID(event) {
  switch (event) {
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
    name: 'Amphitheatre',
    shortName: 'Amphi',
    image: amphitheatre
  },
  {
    name: 'Chatterbox',
    shortName: 'Chatter',
    image: chatterbox
  },
  {
    name: 'Theme Room 1',
    shortName: 'TR1',
    image: themeRoom1
  },
  {
    name: 'Theme Room 2',
    shortName: 'TR2',
    image: themeRoom2
  }
]

export const defaultTypeColor = 'black'

export const typeToColor = {
  Academic: 'dodgerblue'
}

export function getSpaceID(space) {
  switch (space) {
    case 'Amphitheatre':
      return 0
    case 'Chatterbox':
      return 1
    case 'Theme Room 1':
      return 2
    case 'Theme Room 2':
      return 3
    default:
      return -1
  }
}

export const mcMembers = {
  '16th': [
    {
      name: 'CHEAH Wen Jie',
      title: 'President',
      image: sixteenthpresident
    },
    {
      name: 'Devesh NARAYANAN',
      title: 'Vice-President (Welfare)',
      image: sixteenthvpwelfare
    },
    {
      name: 'Hillary TAN',
      title: 'Vice-President (Community Life)',
      image: sixteenthvpcommlife
    },
    {
      name: 'HONG Shao Yang',
      title: 'Honorary General Secretary',
      image: sixteenthhongensec
    },
    {
      name: 'Edwin Luke WEE',
      title: 'Honorary Financial Secretary',
      image: sixteenthhonfinsec
    },
    {
      name: 'WOO Qiyun',
      title: 'Freshmen Orientation Project Director',
      image: sixteenthfopdirector
    }
  ],
  '17th': [
    {
      name: 'THAM Jun Han',
      title: 'President',
      image: seventeethpresident
    },
    {
      name: 'WOO Qi Yun',
      title: 'Vice-President (Welfare)',
      image: seventeethvpwelfare
    },
    {
      name: 'TEE Shu Yun',
      title: 'Vice-President (Community Life)',
      image: seventeethvpcommlife
    },
    {
      name: 'Jeremy JEE',
      title: 'Honorary General Secretary',
      image: seventeethhongensec
    },
    {
      name: 'Melissa TANG',
      title: 'Honorary Financial Secretary',
      image: seventeethhonfinsec
    },
    {
      name: 'ZHANG Quyi',
      title: 'Freshmen Orientation Project Director',
      image: seventeethfopdirector
    }
  ],
  '18th': [
    {
      name: 'Jeremy JEE',
      title: 'President',
      image: eighteenthpresident
    },
    {
      name: 'TEOH Xin Yi',
      title: 'Vice-President (Community Life)',
      image: eighteenthvpcommlife
    },
    {
      name: 'Sanchita SACHDEV',
      title: 'Vice-President (Welfare)',
      image: eighteenthvpwelfare
    },
    {
      name: 'CHOW Kit Ying',
      title: 'Academic Director',
      image: eighteenthacaddirector
    },
    {
      name: 'CHIK Cheng Yao',
      title: 'Honorary General Secretary',
      image: eighteenthhongensec
    },
    {
      name: 'QUEK Siying',
      title: 'Honorary Financial Secretary',
      image: eighteenthhonfinsec
    },
    {
      name: 'Charmaine GOH',
      title: 'Freshmen Orientation Project Director',
      image: eighteenthfopdirector
    }
  ],
  '19th': [
    {
      name: 'NG Hui Ren',
      title: 'President',
      image: nineteenthpresident
    },
    {
      name: 'CHAN Qiu Qing',
      title: 'Vice-President (Community Life)',
      image: nineteenthvpcommlife
    },
    {
      name: 'Venny LEWIS',
      title: 'Vice-President (Welfare)',
      image: nineteenthvpwelfare
    },
    {
      name: 'NG Qian Jie Cheryl',
      title: 'Honorary General Secretary',
      image: nineteenthhongensec
    },
    {
      name: 'WANG Xinman (Mandy)',
      title: 'Honorary Financial Secretary',
      image: nineteenthhonfinsec
    },
    {
      name: 'CHIA Kai Xin',
      title: 'Freshmen Orientation Project Director',
      image: nineteenthfopdirector
    }
  ],
  '20th': [
    {
      name: 'CHAN Qiu Qing',
      title: 'President',
      image: twentiethpresident
    },
    {
      name: 'Lydia CHEE Qian Ting',
      title: 'Vice-President (Community Life)',
      image: twentiethvpcommlife
    },
    {
      name: 'Nisha SUBRAMANIAM',
      title: 'Vice-President (Welfare)',
      image: twentiethvpwelfare
    },
    {
      name: 'Chloe Alexandra Jiayi YUNG',
      title: 'Honorary General Secretary',
      image: twentiethhongensec
    },
    {
      name: 'ZHENG Chengzhi',
      title: 'Honorary Financial Secretary',
      image: twentiethhonfinsec
    },
    {
      name: 'NG Jia Yeong',
      title: 'Academic Director',
      image: twentiethacaddirector
    },
    {
      name: 'Theresia Agustine SANTOSO',
      title: 'Freshmen Orientation Project Director',
      image: twentiethfopdirector
    }
  ],
  '21st': [
    {
      name: 'Gautham S/O Vijayan Kumaran',
      title: 'President',
      image: twentyfirstpresident
    },
    {
      name: 'Lavelle Wong Jing Tong',
      title: 'Vice-President (Community Life)',
      image: twentyfirstvpcommlife
    },
    {
      name: 'Goh Hong Pei',
      title: 'Vice-President (Welfare)',
      image: twentyfirstvpwelfare
    },
    {
      name: 'Ong Yun Ning',
      title: 'Honorary General Secretary',
      image: twentyfirsthongensec
    },
    {
      name: 'Muhammad Harz Bin Zaydie',
      title: 'Honorary Financial Secretary',
      image: twentyfirsthonfinsec
    },
    {
      name: 'Lim Ji Kang',
      title: 'Academic Director',
      image: twentyfirstacaddirector
    },
    {
      name: 'Jamie Lee Fang Hua',
      title: 'Freshmen Orientation Project Director',
      image: twentyfirstfopdirector
    }
  ]
}

export const uscCommittees = [
  {
    name: 'Advisory',
    headedBy: 'Gautham S/O Vijayan Kumaran, President',
    description:
      'USC Advisory Committee is the central administration of USC - as such, it changes every year to reflect USC’s needs! This year, we have the Communications Directorate, Training Directorate, and Special Projects (Exam Welfare Pack Data, Alumni Relations and USC Wiki). We welcome new special projects throughout the year, so do let any of us know if you have thoughts/feedback!',
    image: presidentComm,
    teams: [
      {
        name: 'Communications Director',
        members: 'Odelia'
      },
      {
        name: 'Training Director',
        members: 'Theresia'
      },
      {
        name: 'Special Projects Director',
        members: 'Tarein'
      },
      {
        name: 'Publicity',
        members: 'Shu Qun, Shaena, Sumiko, Tanya'
      },
      {
        name: 'Social Media',
        members: 'Euclea, Maxyn, Odelia'
      },
      {
        name: 'Special Projects Team',
        members:
          'Taerin, Gautham, Theodore, Rachel, Shauna, Issac, Taerin, Lin, Edbert, Sean'
      },
      {
        name: 'Training Directorate',
        members: 'Maxyn, Victoria'
      }
    ]
  },
  {
    name: 'Community Life',
    headedBy: 'Lavelle Wong Jing Tong, Vice-President (Community Life)',
    description:
      'USC Community Life is the #enabler for all our student-initiated activities. From Interest Groups to Ground-Up Initiatives and USProjects (Think USProductions, Camp Reconnect or Connect Tuition), we promote events and activities that contribute to our vibrant USP student life. Alongside student-initiated events, the Cultural Arts and Sports Directorate also organize activities directly. This semester, look forward to Halloween events and Cinna-Mas (Christmas)! Want to start something new for the USP community? Hit us up!',
    image: vpcommlifeComm,
    teams: [
      {
        name: 'Deputy Vice President (Comm Life)',
        members: 'Avelle ',
      },
      {
        name: 'Cultural Arts Director',
        members: 'Tiffany ',
      },
      {
        name: 'Sports Director',
        members: 'Samay ',
      },
      {
        name: 'Cultural Arts Directorate',
        members:
          'Tiffany (Director), Tessa, Cheyenne, Kai, Jeff, Charlotte, Maxyn'
      },
      {
        name: 'GUI Coordinators',
        members: 'Verlyn, Rachel, Wiesiek, Theresia'
      },
      {
        name: 'IG Coordinators',
        members: 'Sumiko, Jeff'
      },
      {
        name: 'Sports Directorate',
        members: 'Ashley, Celest, Mikey, Revanth, Melissa'
      }
    ]
  },
  {
    name: 'Welfare',
    headedBy: 'Goh Hong Pei, Vice-President (Welfare)',
    description:
      "USC Welfare looks after the USP community's well-being, serving as a safety net to provide joy and laughter to students while considering mental and pastoral care for the community. From planning exciting events like Children's Days and Deepavali by our Welfare Projects Committee, our Exam Welfare Committee also organizes the anticipated welfare pack giveaways biannually! Besides, our inter-house coordinators promote inter-house bonding, creating a united community in Cinnahome.",
    image: vpwelfareComm,
    teams: [
      {
        name: 'Deputy Vice President (Welfare)',
        members: 'Yiying '
      },
      {
        name: 'Welfare Projects Director',
        members: 'Tessa'
      },
      {
        name: 'Pastoral Care Director',
        members: 'Yiying'
      },
      {
        name: 'Exam Welfare Director',
        members: 'Celestin '
      },
      {
        name: 'Exam Welfare Committee',
        members: 'Amelyn, Hong Pei, Simone, Celestin, Zhi Xuan'
      },
      {
        name: 'Inter-House Coordinators',
        members: 'Justin, Jun Yi'
      },
      {
        name: 'Pastoral Care Committee',
        members: 'Ash, Hong Pei, Xin Yi, Yiying, Jun Ming, Angel'
      },
      {
        name: 'Welfare Projects Committee',
        members:
          'Shauna, Angel, Cheyenne, Tessa, Kai, Charlotte, Nicole, Linwan'
      }
    ]
  },
  {
    name: 'Academic',
    headedBy: 'Lim Ji Kang, Academic Director',
    description:
      "The Academic Committee represents students' interests in academic-related matters. We seek to improve the academic environment of students in USP through academic initiatives and by surfacing student sentiments to USP faculty and administration - who have been very supportive and receptive to students' feedback.",
    image: academicComm,
    teams: [
      {
        name: 'Deputy Directors',
        members: 'Xin Yi, Eldrick'
      },
      {
        name: 'Core Team',
        members: 'Xin Hui, Ai Xuan, Ji Kang, Jenny, Eldrick, Wei Xi'
      },
      {
        name: 'Focused Projects',
        members: 'Wei En, Sriram, Shu Yuan'
      }
    ]
  },
  {
    name: 'Finance',
    headedBy: 'Muhammad Harz Bin Zaydie, Honorary Financial Secretary',
    description:
      'The Finance Committee oversees the USC budget and helps students with obtaining funding for activities ranging from interest group events to FOP! The comm also organises productions and sales of USC merchandise, and regularly collaborates with other committees such as FOP and Welfare in procuring sponsorship deals for our students.  In addition, Finance comm is actively engaged with external parties, liaising with other RCs in the Co-NUS Inter-RC shirt project and partnering with U-town establishments in offering USCards, our very own student discount card scheme!',
    image: honfinsecComm,
    teams: [
      {
        name: 'Deputy Honorary Financial Secretary',
        members: 'Natalie'
      },
      {
        name: 'Financial Attachés',
        members: 'Kyna, Wei Ming, Mikey, Shaun, Run Fent'
      },
      {
        name: 'Internal Business Development',
        members: 'Natalie, Harz, Avelle, Tong'
      },
      {
        name: 'External Business Development',
        members: 'Sze Xuan, Natalie, Mikey, Daniel, He Li'
      }
    ]
  },
  {
    name: 'Secretariat',
    headedBy: 'Ong Yun Ning, Honorary General Secretary',
    description:
    	"The Secretariat Committee is tirelessly working to improve both USP's physical spaces and cyberspace, adding colour and functionality to our community. We are made up of four subcommittees - Design, Makers' Studio, Spaces and Technologies. Got an idea? Feel free to get in touch with one of us!",
    image: hongensecComm,
    teams: [
      {
        name: 'Deputy Honorary General Secretary',
        members: 'Zhihui'
      },
      {
        name: 'Design Directorate',
        members: 'Natalie, Yun Ning, Min Yee, Givson, Ryan'
      },
      {
        name: "Makers' Studio Directorate",
        members: 'Zhi Hui, Yun Ning, Si Jie, Geraldine, Yu Xin, Meng Yew'
      },
      {
        name: 'Spaces Directorate',
        members: 'Ryan, Zhi Hui, Yun Ning, Joshua, Ryan, Zi Hsien'
      },
      {
        name: 'Technologies Directorate',
        members: 'Donovan, Yun Ning, Yi Hong, Pawandeep, Chuan Kai'
      }
    ]
  },
  {
    name: 'Freshmen Orientation',
    headedBy: 'Jamie Lee Fang Hua, Freshmen Orientation Programme Director',
    description:
      'The FOP committee is the forefront of the yearly Freshman Orientation Programme. The committee is responsible for the planning and execution of the various programmes under FOP, through the engagement with external stakeholders such as House Committees and USP staff. Dedicated towards creating a fun and memorable experience for the freshmen, the Committee aims to curate and refine the program - ensuring a warm welcome and seamless integration of the freshmen into the USP community.',
    image: fopdirectorComm,
    teams: [
      {
        name: 'Vice Director',
        members: 'Grace'
      },
      {
        name: 'Primary Comm',
        members:
          'Shanna, Wan Ting, Grace, Jie Yi, Hannah, Givson, Yongbeom, Jamie, Oi Hua, Sin Ler'
      }
    ]
  }
]

export const houseCommittees = [
  {
    name: 'Ursaia',
    image: ursaia,
    members: [
      {
        name: 'Tristan Tan',
        title: 'House Captain'
      },
      {
        name: 'Iyan Danial',
        title: 'Vice House Captain'
      },
      {
        name: 'Reycherl Eng',
        title: 'Chief Orientation Group Leader'
      },
      {
        name: 'Kok Ai Xuan',
        title: 'Vice Chief Orientation Group Leader'
      }
    ]
  },
  {
    name: 'Nocturna',
    image: nocturna,
    members: [
      {
        name: 'Chew Hong Jin',
        title: 'House Captain'
      },
      {
        name: 'Yu Jia Lin',
        title: 'Vice House Captain'
      },
      {
        name: 'Sim Hsin Wei Lauren',
        title: 'Chief Orientation Group Leader'
      },
      {
        name: 'Chong Shin Ee',
        title: 'Vice Chief Orientation Group Leader'
      }
    ]
  },
  {
    name: 'Ianthe',
    image: ianthe,
    members: [
      {
        name: 'Su Yan Le',
        title: 'House Captain'
      },
      {
        name: 'Tan Enn Syn, Shona',
        title: 'Vice House Captain'
      },
      {
        name: 'Ashley Goh Ying Yue',
        title: 'Chief Orientation Group Leader'
      },
      {
        name: 'Pierre Russell Ho Jun',
        title: 'Vice Chief Orientation Group Leader'
      }
    ]
  },
  {
    name: 'Triton',
    image: triton,
    members: [
      {
        name: 'Ryan Quek Wei Heng',
        title: 'House Captain'
      },
      {
        name: 'Muhamad Mamfizam bin Ismail',
        title: 'Vice House Captain'
      },
      {
        name: 'Loh Le Xuan',
        title: 'Chief Orientation Group Leader'
      },
      {
        name: 'Charmaine Sew Fan Ning',
        title: 'Vice Chief Orientation Group Leader'
      }
    ]
  },
  {
    name: 'Ankaa',
    image: ankaa,
    members: [
      {
        name: 'Eu Shae-Anne',
        title: 'House Captain'
      },
      {
        name: 'Ashley How Kai Xin',
        title: 'Vice House Captain'
      },
      {
        name: 'Joelle Tang Ting Yee',
        title: 'Chief Orientation Group Leader'
      },
      {
        name: 'Crystal Phua',
        title: 'Vice Chief Orientation Group Leader'
      }
    ]
  },
  {
    name: 'Saren',
    image: saren,
    members: [
      {
        name: 'Dylan Ho Shu Jie',
        title: 'House Captain'
      },
      {
        name: 'Zhi Yi Lew',
        title: 'Vice House Captain'
      },
      {
        name: 'Clementine Bella Putri Santosa',
        title: 'Chief Orientation Group Leader'
      },
      {
        name: 'Stefanie Sew',
        title: 'Vice Chief Orientation Group Leader'
      }
    ]
  }
]
