/*

╋╋╋┏┓╋╋╋┏┓╋╋╋┏┓
╋╋╋┃┃╋╋┏┛┗┓╋╋┃┃╋╋┏┓
┏━━┫┃┏┓┣┓┏╋━━┫┗━┓┗╋━━┓
┃┏━┫┃┃┃┃┃┃┃┏━┫┏┓┃┏┫━━┫
┃┗━┫┗┫┗┛┃┗┫┗━┫┃┃┣┫┣━━┃
┗━━┻━┻━━┻━┻━━┻┛┗┻┫┣━━┛
╋╋╋╋╋╋╋╋╋╋╋╋╋╋╋╋┏┛┃
╋╋╋╋╋╋╋╋╋╋╋╋╋╋╋╋┗━┛

clutch.js
---
github.com/klenovich/clutchjs
---
A just-in-time automated package that increases preformance standards by a large metric.

*/

class PriorityQueue {
  constructor(comparator = (a, b) => a > b) {
    this._heap = [];
    this._comparator = comparator;
  }

  size() {
    return this._heap.length;
  }

  peek() {
    return this._heap[top(0)];
  }

  isEmpty() {
    return this.size() == 0;
  }

  push(value) {
    this._heap.push(value);
    this._siftUp();
    return this.size();
  }

  pop() {
    const poppedValue = this.peek();
    const bottom = this.size() - 1;
    if (bottom > topIndex) {
      this._swap(topIndex, bottom);
    }
    this._heap.pop();
    this._siftDown();
    return poppedValue;
  }

  replace(value) {
    const replacedValue = this.peek();
    this._heap[topIndex] = value;
    this._siftDown();
    return replacedValue;
  }

  _greater(i, j) {
    return this._comparator(this._heap[i], this._heap[j]);
  }

  _swap(i, j) {
    [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
  }

  _siftUp() {
    let node = this.size() - 1;
    while (node > topIndex && this._greater(node, parent(node))) {
      this._swap(node, parent(node));
      node = parent(node);
    }
  }

  _siftDown() {
    let node = topIndex;
    while (
      (left(node) < this.size() && this._greater(left(node), node)) ||
      (right(node) < this.size() && this._greater(right(node), node))
    ) {
      let maxChild = (right(node) < this.size() && this._greater(right(node), left(node))) ? right(node) : left(node);
      this._swap(node, maxChild);
      node = maxChild;
    }
  }
}

function topIndex() {
  return 0;
}

function parent(i) {
  return ((i + 1) >>> 1) - 1;
}

function left(i) {
  return (i << 1) + 1;
}

function right(i) {
  return (i + 1) << 1;
}

module.exports = PriorityQueue;