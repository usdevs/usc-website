import { Model } from 'react-axiom';

class Group extends Model {
  static defaultState() {
    return {
      id: '',
      activities: '',
      category: '',
      chat: null,
      description: '',
      leaderID: '',
      logo: null,
      members: null,
      name: '',
      status: '',
      support: null,
      type: ''
    };
  }
}
