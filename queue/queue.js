/**
 * Author: Bradley Dugdale
 * A simple queue implementation
 * @returns {CreateQueue.Queue}
 * @constructor
 */
function CreateQueue(){

    function Node(value){
        this.value = value;
        this.next = undefined;
    }

    Node.prototype.print = function(){
        console.log(this.value);
    };

    /**
     * Create the empty queue
     * @constructor
     */
    function Queue(){
        this.first = undefined;
        this.last = undefined;
        this.size = 0;
    }

    /**
     * Adds an item to the queue
     * @param value
     */
    Queue.prototype.enqueue = function(value){
        var newNode = new Node(value);
        if(this.first === undefined){
            this.first = newNode;
            this.last = newNode;
        }
        else {
            this.last.next = newNode;
            this.last = newNode;
        }
        this.size = this.size + 1;
    };

    /**
     * Peeks at te next item in the queue
     * @returns {*}
     */
    Queue.prototype.peek = function(){
        return this.first;
    };

    /**
     * Returns and removes te next item in the queue
     * @returns {*}
     */
    Queue.prototype.dequeue = function(){
        var nodeToReturn = this.first;
        this.first = this.first.next;
        this.size = this.size - 1;
        return nodeToReturn;
    };

    /**
     * Prints all items in the queue
     */
    Queue.prototype.printQueue = function(){
        var nodeToPrint = this.first;
        while(nodeToPrint !== undefined){
            console.log(nodeToPrint.value);
            nodeToPrint = nodeToPrint.next;
        }
    };
    return new Queue();
}

module.exports.CreateQueue = CreateQueue;