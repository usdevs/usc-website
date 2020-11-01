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
  ]
}

export const uscCommittees = [
  {
    name: 'Advisory',
    headedBy: 'Chan Qiu Qing, President',
    description:
      'USC Advisory Committee is the central administration of USC - as such, it changes every year to reflect USC’s needs! This year, we have the Communications Directorate, Training Directorate, and Special Projects (Exam Welfare Pack Data, Alumni Relations and USC Wiki). We welcome new special projects throughout the year, so do let any of us know if you have thoughts/feedback!',
    image: presidentComm,
    teams: [
      {
        name: 'Communications Directorate',
        members:
        	'Yeo Shao Jie (Director), Teoh Xin Yi (Director), Hua Xin Hui, Low Qian Ling Claire, Rachel Teng Ying Xin'
      },
      {
        name: 'Social Media Managers',
        members:
        	'Ng Yu Fang, Stephanie Goh'
      },
      {
        name: 'Special Projects Team',
        members:
        	'Tham Jun Han (Alumni Relations), Wong Li Fang (USC Wiki, Director), Hong Ai Ling (USC Wiki), Marcus Ng Yong Ming (USC Wiki), Mah Cai Jun, Terence (Welfare Pack Data, Director)'
      },
      {
        name: 'Training Directorate',
        members: 'Tan Kia Sim Kathy (Director), Rachel Teng Ying Xin'
      }
    ]
  },
  {
    name: 'Community Life',
    headedBy: 'Lydia Chee Qian Ting, Vice-President (Community Life)',
    description:
      'USC Community Life is the #enabler for all our student-initiated activities. From Interest Groups to Ground-Up Initiatives and USProjects (Think USProductions, Camp Reconnect or Connect Tuition), we promote events and activities that contribute to our vibrant USP student life. Alongside student-initiated events, the Cultural Arts and Sports Directorate also organize activities directly. This semester, look forward to Halloween events and Cinna-Mas (Christmas)! Want to start something new for the USP community? Hit us up!',
    image: vpcommlifeComm,
    teams: [
    {
        name: 'Deputy Director',
        members:
        	'Lum Yen Yi',
      },
      {
        name: 'IG Coordinators',
        members: 'Sumiko Teng, Muhammad Excel Muslim'
      },
      {
        name: 'GUI Coordinators',
        members:
          'Khoo Jia le Isaac, Adele Chin'
      },
      {
        name: 'Sports Directorate',
        members:
        	'Gabriel May Moe Kyaw (Director), Tang Boxuan, Teo Kun Ho Arnold, Claire Swee'
      },
      {
        name: 'Cultural Arts Directorate',
        members:
          'Wu Fan (Director), Tiffany Ho, Gautham S/O Vijayan Kumaran, Allard Quek, Tan Yi Rong Euclea, Marcus Chew Heng Wee, Yip Sze Kay, Rhea Sharma'
      }
    ]
  },
  {
    name: 'Welfare',
    headedBy: 'Nisha Subramaniam, Vice-President (Welfare)',
    description:
      "USC Welfare looks after the USP community's well-being, serving as a safety net to provide joy and laughter to students while considering mental and pastoral care for the community. From planning exciting events like Children's Days and Deepavali by our Welfare Projects Committee, our Exam Welfare Committee also organizes the anticipated welfare pack giveaways biannually! Besides, our inter-house coordinators promote inter-house bonding, creating a united community in Cinnahome.",
    image: vpwelfareComm,
    teams: [
      {
        name: 'Welfare Projects Committee',
        members: 'Chong Wei Xin (Director), Zhang Yiying (Deputy Director, Pastoral), Wu Fan, Ng Yu Fang, Marcus Ng Yong Ming, Gautum Girish Vasnani, Amanda Loh, Charlotte Boulanger, Kong Min Yee (Pastoral), Rhea Sharma'
      },
      {
        name: 'Exam Welfare Committee',
        members: 'Wu Weiming (Director), Kork Ling Hui, Tang Kwan Hou, Jolyn Ho Jun Ning (Pastoral), Tan Yi Hui Valerie (Pastoral)'
      },
      {
        name: 'Inter-House Coordinators',
        members: 'Victoria Lim Yuk Ki, Lim Yi Jin'
      }
    ]
  },
  {
    name: 'Academic',
    headedBy: 'Ng Jia Yeong, Academic Director',
    description:
    	"The Academic Committee represents students' interests in academic-related matters. We seek to improve the academic environment of students in USP through academic initiatives and by surfacing student sentiments to USP faculty and administration - who have been very supportive and receptive to students' feedback.",
    image: academicComm,
    teams: [
      {
        name: 'Internal Projects Committee',
        members:
        	'Lim Pei Rong Angela (Deputy Director), Lu Jinyao, Wang Xinman (Mandy), Gautum Girish Vasnani, Cheong Kwang Aik Eldrick, Tan Kai Qian Makarios, Goh Jun Ming, Ong Sing Huat Jonathan, Hua Xin Hui',
      },
      {
        name: 'Data and Communications Committee',
        members:
        	'Mah Cai Jun (Deputy Director), Terence, Wang Mengzhe, Jermaine Tang Chor Yee, Lim Yu Fei, Lum Yen Yi',
      }
    ]
  },
  {
    name: 'Finance',
    headedBy: 'Zheng Chengzhi, Honorary Financial Secretary',
    description:
    	"The Finance Committee oversees the USC budget and helps students with obtaining funding for activities ranging from interest group events to FOP! The comm also organises productions and sales of USC merchandise, and regularly collaborates with other committees such as FOP and Welfare in procuring sponsorship deals for our students.  In addition, Finance comm is actively engaged with external parties, liaising with other RCs in the Co-NUS Inter-RC shirt project and partnering with U-town establishments in offering USCards, our very own student discount card scheme!",
    image: honfinsecComm,
    teams: [
      {
        name: 'Deputy Honorary Financial Secretary (Biz Dev)',
        members: 'Law Wing Sum'
      },
      {
        name: 'Deputy Honorary Financial Secretary (Attachés)',
        members: 'Tee Jing Ying'
      },
      {
        name: 'Financial Attachés',
        members:
        	'Tee Jing Ying (Welfare & Standing Comm), Tang Boxuan (Secretariat & Standing Comm), Lim Yi Jin (Houses), Muhammad Harz Bin Zaydie (Comm Life), Alson Tay Zhi Sheng (Houses), Chang Wei Ching (Comm Life)'
      },
      {
        name: 'Marketing Executives (Internal Business Development)',
        members: 'June Tan Ying Shuang, He Li, Xiao Chengxin, Yong Chuen Shin'
      },
      {
        name: 'Marketing Executives (External Business Development)',
        members:
        	'Gau Meng Yew (USCards Project IC), Isabel Teo Jing Lin (CoNUS Shirt Project IC), Tabitha Tan Si Yi (Sponsorships IC), Sadia Haque, Renee Lee, Natalie Chung Hui En'
      }
    ]
  },
  {
    name: 'Secretariat',
    headedBy: 'Chloe Alexandra Jiayi Yung, Honorary General Secretary',
    description:
    	"The Secretariat Committee is tirelessly working to improve both USP's physical spaces and cyberspace, adding colour and functionality to our community. We are made up of four subcommittees - Design, Makers' Studio, Spaces and Technologies. Got an idea? Feel free to get in touch with one of us!",
    image: hongensecComm,
    teams: [
      {
        name: 'Design Directorate',
        members:
          'Ong Yun Ning (Director), Jen Chik Hui Xin, Leong Yue Qi, Pearl Koswara, Peng Mu Zi, Yong Chuen Shin, Zhang Ziqing'
      },
      {
        name: "Makers' Studio Directorate",
        members:
          "Hu Yu Xin (Director), Gau Meng Yew (Deputy Director), Chua Hsi-Ern Caylee (Deputy Director), Cao Ngoc Linh (Logistics Director (Makers')), Andrew Sutjipto, Chen Yiyang, Daniel Tan Ren Jie, Ho Jie Feng, Khoo Jia Le Isaac, Loh Jing Yen, Lynette Chia Sze Min, Marcus Lim Tze Yang, Ng Qian Jie Cheryl, Peng Mu Zi, Ryan Lee Rui En, Ryan Ong Ren-An, Samuel Lai Chang En, See Tow Zi Hsien, Tan Jin Jie, Tan Yong-Jia Naaman, Tan Zhen Xuan Jasper"
      },
      {
        name: 'Spaces Directorate',
        members:
          'Chan Tzen Yi (Director), So Ee Cheng (Deputy Director), Ryan Ch’ng Wei Han (Logistics Director (IC)), Abraham Wong (Logistics Director (Spaces)), Gau Meng Yew, Leong Yue Qi, Marcus Lim Tze Yang, Ng Hui Ren, Tan Yi Rong, Euclea, Hua Yuhan'
      },
      {
        name: 'Technologies Directorate',
        members:
          'Mitchell Kwong (Director), Jivesh Mohan (Deputy Director), Allard Quek, Chen Yiyang, Goh Siau Chiak, Hazel Tan, Hong Ai Ling, Justin Hoe Jia Jie, Melissa Ong Yi Lin, Ng Qian Jie Cheryl, R Ramana, Ryan Ong Ren-An, Quek Siying, Tan Jin Jie, Tan Yong-Jia Naaman, Teo Chuan Kai, Wang Xinman (Mandy), Wong Zi Xin Avellin, Xiao Chengxin, Zhang Ziqing'
      }
    ]
  },
  {
    name: 'Freshmen Orientation',
    headedBy: 'Theresia Agustine Santoso, Freshmen Orientation Programme Director',
    description:
    	'Comprising of 8 main sub-committees, the FOP committee is the forefront of the yearly Freshman Orientation Programme. The committee is responsible for the planning and execution of the various programmes under FOP, through the engagement with external stakeholders such as House Committees and USP staff. Dedicated towards creating a fun and memorable experience for the freshmen, the Committee aims to curate and refine the program - ensuring a warm welcome and seamless integration of the freshmen into the USP community.',
    image: fopdirectorComm,
    teams: [
      {
        name: 'Vice Director',
        members: 'Odelia Ong Mun'
      },
      {
        name: "Orientation Camp (O'Camp)",
        members:
          'Yee Dong Ying Megan (Project Director), Melissa Ong Yi Lin (Vice-Project Director), Michael Alexander, Vivienne Teo Sher Yi, Hu Linglong, Christopher Ang Ming Yang, Vera Khoo, Shi Shu Yuan, Tanya Ragupathi, Bharathkumar Sriram, Gabriel Goh Han Jie, Lucy Maria Beatriz Porras Lauron, Rachelle Marie Chua Hui Ling, Allard Quek, Jovyn Tan Li Shyan, Marcus Lim, Ezra Daniel Faizal'
      },
      {
        name: "Orientation Week (O'Week)",
        members:
          'Lyn Tan (Project Director), Lim Ji Kang (Vice-Project Director), Amanda Soh Xuan Min, Tan Lay Yee Celestin, Lau Yong Yee Chloe, Leong Xin Ru Sarah, Simone Teo Kay, Gau Meng Yew, Jonathan Loh Jiahui, Tang Boxuanm, Jin Mei Xuan, Amelyn Low Zhi Ning, Ng Hui Xin, Natalie Lem, Lim Tse Hwee (Lin Zhihui)'
      },
      {
        name: 'Events',
        members:
          'Ng Sze Xuan (Project Director), James Lao (Vice-Project Director), Hong Ai Ling, Tan Shi Zhen, Tan Kai Qian Makarios, Gau Meng Yew, Aloysius Chow, Daniel Tan Ren Jie, Jeriel Teo'
      },
      {
        name: 'Batch Project',
        members:
          'Lim Xin Yi (Project Director), Timothy Wan (Vice-Project Director), Jessy, Chen Silin, Simone Teo Kay, Isabel Teo Jing Lin, Chang Soo Yen, Tan Shi Zhen, Neo Wei Qing, Boey Jia Ning Vicki, Verlyn Ku, Edbert Wartono, Syarifah Aneesa'
      },
      {
        name: 'Finance',
        members:
          "Natalie Chung Hui En (Director), Ng Hui Xin (O'Week), Jovyn Tan (O'Camp), Hong Ai Ling (Events), Neo Wei Qing (Batch Project)"
      },
      {
        name: 'Public Relations',
        members:
          'Justin Lim Yong Jie (Director), Melissa Japar, Kong Min Yee, Sadia Haque, Aloysius Chow, Edbert Wartono, Tian Mengxi'
      },
      {
        name: 'Creative',
        members:
          'Sarah Lim Rui En (Director), Charlotte Teng, Choo Ruizhong, Christina Fu, Constance Tan, Samantha Moey, Syarifah Aneesa, Thin Lae Yi Zaw, Verlyn Ku'
      },
      {
        name: 'Operations',
        members:
          'Wan Yoke Chun Shaena (Director), Ezra Daniel, Marcus Lim, Natalie Lem, Lim Tse Hwee (Lin Zhihui), Jeriel Teo, Isabel Teo'
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
        name: 'Wong Shi Ting Calista',
        title: 'House Captain'
      },
      {
        name: 'Quek Xian Yi Erwin',
        title: 'Vice House Captain'
      },
      {
        name: 'Brittney Loke Zi Qing',
        title: 'Chief Orientation Group Leader'
      },
      {
        name: 'Tan Jun Yi',
        title: 'Vice Chief Orientation Group Leader'
      }
    ]
  },
  {
    name: 'Nocturna',
    image: nocturna,
    members: [
      {
        name: 'Yap Yu Qi Delphie',
        title: 'House Captain'
      },
      {
        name: 'Low Si Jie',
        title: 'Vice House Captain'
      },
      {
        name: 'Ng Qi Xuan',
        title: 'Chief Orientation Group Leader'
      },
      {
        name: 'Joshen Lim',
        title: 'Vice Chief Orientation Group Leader'
      }
    ]
  },
  {
    name: 'Ianthe',
    image: ianthe,
    members: [
      {
        name: 'Goh Jun Ming',
        title: 'House Captain'
      },
      {
        name: 'Putri Pearl Koswara',
        title: 'Vice House Captain'
      },
      {
        name: 'Ryan Ong Ren-An',
        title: 'Chief Orientation Group Leader'
      },
      {
        name: 'Ryan Lee Rui En',
        title: 'Vice Chief Orientation Group Leader'
      }
    ]
  },
  {
    name: 'Triton',
    image: triton,
    members: [
      {
        name: 'Cheng Zhibin Nicholas',
        title: 'House Captain'
      },
      {
        name: 'Jerome Ong Yi Jie',
        title: 'Vice House Captain'
      },
      {
        name: 'Tan Joe Wel',
        title: 'Chief Orientation Group Leader'
      },
      {
        name: 'Ha Tae Rin',
        title: 'Vice Chief Orientation Group Leader'
      }
    ]
  },
  {
    name: 'Ankaa',
    image: ankaa,
    members: [
      {
        name: 'Justin Rong Hengyang',
        title: 'House Captain'
      },
      {
        name: 'Goh Hong Pei',
        title: 'Vice House Captain'
      },
      {
        name: 'Lavelle Wong Jing Tong',
        title: 'Chief Orientation Group Leader'
      },
      {
        name: 'Tan Yan Feng',
        title: 'Vice Chief Orientation Group Leader'
      }
    ]
  },
  {
    name: 'Saren',
    image: saren,
    members: [
      {
        name: 'Gautham S/O Vijayan Kumaran',
        title: 'House Captain'
      },
      {
        name: 'Maxyn Claris Koh',
        title: 'Vice House Captain'
      },
      {
        name: 'Avelle Wong Shi Ying',
        title: 'Chief Orientation Group Leader'
      },
      {
        name: 'Ang Jun Yi',
        title: 'Vice Chief Orientation Group Leader'
      }
    ]
  }
]
