export default class Component {
  // ? props = {}는 객체로 받아오겠다는 뜻인가?
  // * props가 제공되지 않을 때, 객체로 초기화하는 세팅
  constructor(props = {}){
    this.props = props;
    this.state = {};
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render() 
    // * 여기서 render를 호출하는 이유 : 상태가 바뀌면 다시 랜더링되도록하는 것
  }

  render() {
    // 여기에 Dom 업데이트 로직
    
  }
}