function Node(value) {
  this.value = value;
  this.next = null;
}

function Queue() {
  this.head = null;
  this.tail = null;
  this.size = 0;
}

Queue.prototype.len = function() {
  return this.size;
};
Queue.prototype.enqueue = function(value) {
  let newNode = new Node(value);
  if (!this.head) {
    this.head = newNode;
    this.tail = newNode;
  } else {
    this.tail.next = newNode;
    this.tail = newNode;
  }
  this.size++;
};
Queue.prototype.dequeue = function() {
  if (!this.head) {
    return null;
  } else {
    let val = this.head.value;
    this.head = this.head.next;
    this.size--;
    return val;
  }
};

module.exports = { Queue };
