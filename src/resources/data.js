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

import presidentComm from './images/USCommitees/advisory.jpg'
import vpwelfareComm from './images/USCommitees/welfare.jpg'
import vpcommlifeComm from './images/USCommitees/commlife.jpg'
import academicComm from './images/USCommitees/academic.jpg'
import honfinsecComm from './images/USCommitees/finance.jpg'
import hongensecComm from './images/USCommitees/secretariat.jpg'
import fopdirectorComm from './images/USCommitees/fop.jpg'

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
      name: 'Hillary TAN',
      title: 'Vice-President (Welfare)',
      image: sixteenthvpwelfare
    },
    {
      name: 'Devesh NARAYANAN',
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
  ]
}

export const uscCommittees = [
  {
    name: 'Advisory',
    headedBy: 'Ng Hui Ren, President',
    image: presidentComm,
    teams: [
      {
        name: 'Communications Team',
        members:
          'Mah Terence, Leebrant Theodore, Muhammad Excel Muslim, Low Qian Ling Claire, Tan Kassandra, Viswanath Suresh, Lim Su Woon Sarah, Tang Kwan Hou'
      },
      {
        name: 'Alumni Relations Team',
        members:
          'Tan Kia Sim, Kathy, Yip Sze Kay, Wu Fan, Seow Nicole, Hoe Jia En Allison'
      },
      {
        name: 'Think Tank',
        members: 'Mah Terence, Auyok Sean, Atharv Joshi, Hong Shao Yang'
      }
    ]
  },
  {
    name: 'Community Life',
    headedBy: 'Chan Qiu Qing, Vice-President (Community Life)',
    image: vpcommlifeComm,
    teams: [
      {
        name: 'Sports Directorate',
        members:
          'Guek Jun Kai, Sebastian (Director), R Ramana, Ang Jing Zhe, Vijayan Kumaran Kausalya'
      },
      {
        name: 'Cultural Arts Directorate',
        members:
          'Wu Fan (Director), Sim Rou Chen, Tan June, Yip Sze Kay, Lin Yuan, Ng Ming Qian, Wong Li Fang, Qian Zihan'
      },
      {
        name: 'Operations & Logistics Directorate',
        members: 'You Jing You (Director), Gautum Vasnani, Muley Ishaan'
      },
      {
        name: 'IG Coordinators (Non-Sports)',
        members: 'Chengzhi Zheng, Muhammad Excel Muslim'
      },
      {
        name: 'GUI Coordinators (Social/Cultural/Academic/Welfare)',
        members:
          'Loh Jonina, Hnin Azali (Brenda), Marcus Ng Yong Ming, Chan Min Yi'
      }
    ]
  },
  {
    name: 'Student Welfare',
    headedBy: 'Venny Lewis, Vice-President (Welfare)',
    image: vpwelfareComm,
    teams: [
      {
        name: 'Welfare Projects Team',
        members:
          'Chng Dinise (Director), Neo Renee (Deputy Director, General), Lye Cheng Wen Joanne, Theodore Vito, Ng Marcus Yong Ming, Nai Jing Wen Bernessa, Ho Jun Ning Jolyn (Pastoral Care), Tjong Samantha Gladys (Deputy Director, International Students)'
      },
      {
        name: 'Inter-House Coordinators',
        members: 'Peng Yun Ting, Low Chen Yi Sean'
      },
      {
        name: 'Exam Welfare Team',
        members: 'Ang Wei Shen Michael, L Krishaa, Tan Yi Hui Valerie'
      }
    ]
  },
  {
    name: 'Academic',
    headedBy: 'Ng Hui Ren, President',
    image: academicComm,
    teams: [
      {
        name: 'Academic Committee',
        members:
          'Vijayan Kumaran Kausalya (Director), Wang Zijun (Curriculum Review Committee Representative), Chan Yun Yee Michelle, Yap Mitchell, Keoliya Mayank, Hnin Azali (Brenda), Chua Leah, Loo Nicole, Hoe Jia En Allison, Mah Terence, Wu Weiming, Lim Darren'
      }
    ]
  },
  {
    name: 'Secretariat',
    headedBy: 'Ng Qian Jie Cheryl, Honorary General Secretary',
    image: hongensecComm,
    teams: [
      {
        name: 'Spaces Directorate',
        members:
          'Yung Chloe (Director), Abraham Wong, Tjong Samantha Gladys, Chew Heng Wee Marcus, Daniel Ho'
      },
      {
        name: 'Design Directorate',
        members:
          'Foo Yong Qing (Director), Wang Xuanqi, Sim Rou Chen, Leong Yue Qi'
      },
      {
        name: 'Maker Studio Directorate',
        members:
          'Tan Daniel (Director), Lai Chang En Samuel, Tan Jin Jie, Khoo Benedict, Chow Kit Ying, Neo Kai Wen Jevon, Ke Er Chloe Lee, Low Ju Li, Jazreel, Leong Yue Qi, Wang Xuanqi'
      }
    ]
  },
  {
    name: 'Finance',
    headedBy: 'Wang Xinman (Mandy), Honorary Financial Secretary',
    image: honfinsecComm,
    teams: [
      {
        name: 'Deputy Honorary Financial Secretaries',
        members: 'Xiao Chengxin (Attaché), Alvin Jun Heng Choo (Biz Dev)'
      },
      {
        name: 'Business Development & Marketing Executives (External)',
        members:
          'Yi Hui Valerie Tan, Peng Yun Ting, Jing Ying Tee, Tay Ming Kiat, Tan June, Chan Min Yi, Weng Yek Wong, Kenny Ang (FOP), Clare Chia (FOP)'
      },
      {
        name: 'Business Development & Marketing Executives (Internal)',
        members: 'Wang Yihe, Wing Sum Law, You Jing You'
      },
      {
        name: 'Financial Attaches',
        members:
          'Dave Zhang Yun Hu (Secretariat & Advisory), Ajeya Mantri (Welfare), Chengzhi Zheng (Community Life), Xin Yi Marion Kua (Houses)'
      }
    ]
  },
  {
    name: 'Freshmen Orientation',
    headedBy: 'Chia Kai Xin, Freshmen Orientation Director',
    image: fopdirectorComm,
    teams: [
      {
        name: 'Deputy Director',
        members: 'Shawne Goh'
      },
      {
        name: "Orientation Camp (O'Camp)",
        members: 'Nisha Subramaniam (Project Director)'
      },
      {
        name: "Orientation Week (O'Week)",
        members: 'Christabelle Peng (Project Director)'
      },
      {
        name: 'Events',
        members: 'Qi Ting Joei Ow (Project Director)'
      },
      {
        name: 'Batch Project',
        members: 'Yen Yi Lum (Project Director)'
      },
      {
        name: 'Finance',
        members: 'Clare Chia (Project Director)'
      },
      {
        name: 'Public Relations',
        members: 'Sijie Grace Ong (Project Director)'
      },
      {
        name: 'Creative',
        members: 'Tiffany Ho (Project Director)'
      },
      {
        name: 'Operations',
        members: 'Si Tian Lim (Project Director)'
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
        name: 'Tan Armado Yi Zhou',
        title: 'House Captain'
      },
      {
        name: 'Zhang Zhen Li Jenny',
        title: 'Vice House Captain'
      },
      {
        name: 'Ng Zhili',
        title: 'Chief Orientation Group Leader'
      },
      {
        name: 'Low Si Yu Sabrina',
        title: 'Vice Chief Orientation Group Leader'
      }
    ]
  },
  {
    name: 'Nocturna',
    image: nocturna,
    members: [
      {
        name: 'Hussain Fathah',
        title: 'House Captain'
      },
      {
        name: 'Lee Tze Kerr Scott',
        title: 'Vice House Captain'
      },
      {
        name: 'Douglas Leong',
        title: 'Chief Orientation Group Leader'
      },
      {
        name: 'Ng Sze Munn Elyssa',
        title: 'Vice Chief Orientation Group Leader'
      }
    ]
  },
  {
    name: 'Ianthe',
    image: ianthe,
    members: [
      {
        name: 'Salifian Bin Sulaiman',
        title: 'House Captain'
      },
      {
        name: 'Kenny Ang Wee Howe',
        title: 'Vice House Captain'
      },
      {
        name: 'Claire Low Qian Ling',
        title: 'Chief Orientation Group Leader'
      },
      {
        name: 'Gabriel May Moe Kyaw',
        title: 'Vice Chief Orientation Group Leader'
      }
    ]
  },
  {
    name: 'Triton',
    image: triton,
    members: [
      {
        name: 'Choo Ruizhong',
        title: 'House Captain'
      },
      {
        name: 'Chan Tzen Yi',
        title: 'Vice House Captain'
      },
      {
        name: 'Lim Yijin',
        title: 'Chief Orientation Group Leader'
      },
      {
        name: 'Ng Jia Yeong',
        title: 'Vice Chief Orientation Group Leader'
      }
    ]
  },
  {
    name: 'Ankaa',
    image: ankaa,
    members: [
      {
        name: 'Michelle Phua Kah Hwee',
        title: 'House Captain'
      },
      {
        name: 'Goh Siau Chiak',
        title: 'Vice House Captain'
      },
      {
        name: 'Liaw Wyi Wying',
        title: 'Chief Orientation Group Leader'
      },
      {
        name: 'Cheong Kwang Aik Eldrick',
        title: 'Vice Chief Orientation Group Leader'
      }
    ]
  },
  {
    name: 'Saren',
    image: saren,
    members: [
      {
        name: 'Victoria Lim Yuk Ki',
        title: 'House Captain'
      },
      {
        name: 'Nicholas Lam Wei Xiang',
        title: 'Vice House Captain'
      },
      {
        name: 'Amanda Loh Hui Ling',
        title: 'Chief Orientation Group Leader'
      },
      {
        name: 'Marcus Ng Yong Ming',
        title: 'Vice Chief Orientation Group Leader'
      }
    ]
  }
]
