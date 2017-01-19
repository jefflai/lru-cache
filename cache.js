class Node {
  constructor(value, previous, next) {
    this.value = value;
    this.previous = previous;
    this.next = next;
  }
}

export default class Cache {

  constructor(limit) {
    this.limit = limit;
    this.data = {};
  }

  get(key) {
    let datum = this.data[key];
    if (!datum) {
      return undefined;
    } else {
      return datum.value;
    }
  }

  set(key, value) {
    if (!!this.head && Object.keys(this.data).length >= this.limit) {
      let expiredKey = this.head.value;
      delete this.data[expiredKey];
      this.head.next.previous = null;
      this.head = this.head.next;
    }

    let node;
    if (key in this.data) {
      node = this.data[key].node;
      previousNode = node.previous;
      nextNode = node.next;
      previousNode.next = nextNode;
      nextNode.previous = previousNode;
    } else {
      node = new Node(key);
    }

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.previous = this.tail;
      this.tail.next = node;
      this.tail = node;
    }

    this.data[key] = {value: value, node: node};
  }
};
