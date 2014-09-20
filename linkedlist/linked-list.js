/**
 * Author: Bradley Dugdale
 * Creates and returns an instance of a doubly-linked list
 * @returns {CreateLinkedList.LinkedList}
 * @constructor
 */
function CreateLinkedList(){

    "use strict";

    /**
     * A wrapper object for the given value which add
     * pointers to the next and previous elements
     * @param value
     * @constructor
     */
    function ListElement(value){
        this.value = value;
        this.previous;
        this.next;
        this.isFirst = false;
        this.isLast = false;
    }

    /**
     * Prints the value of the node
     */
    ListElement.prototype.print = function(){
        var printStr = "[" + this.value + "] ";

        if(this.isFirst){
            printStr +=  "isFirst: true";
        }

        if(this.isLast){
            printStr +=  "isLast: true";
        }

        console.log(printStr);
    };

    /**
     * Returns an iterator for the list
     * with this.node always being the next node to be returned.
     * @param node
     * @constructor
     */
    function LinkedListIterator(node){
        this.node = node;
    }

    /**
     * Returns true if there is a next element in the list to be iterated
     * @returns {boolean}
     */
    LinkedListIterator.prototype.hasNext = function(){
        if(this.node !== undefined){
            return true;
        }
        return false;
    };

    /**
     * Returns the next element to be iterated
     * @returns {*}
     */
    LinkedListIterator.prototype.next = function(){
        var returnVal = this.node;
        this.node = this.node.next;
        return returnVal;
    };

    function LinkedList() {
        this.first = undefined;
        this.last = undefined;
        this.count = 0;
    }

    /**
     * Adds all values to the list
     * @param values
     */
    LinkedList.prototype.addAll = function(values){
        if(values !== undefined && values.length && values.length > 0){
            for (var i = 0; i < values.length; i++){
                this.add(values[i]);
            }
        }
    };

    /**
     * Empties the list
     */
    LinkedList.prototype.empty = function(){
        this.first = undefined;
        this.last = undefined;
        this.count = 0;
    };

    /**
     * Returns the size of the list
     * @returns {number}
     */
    LinkedList.prototype.size = function(){
        return this.count;
    };

    /**
     * Adds the given item to the list
     * @param elem
     */
    LinkedList.prototype.add = function(elem){
        var newElem = new ListElement(elem);
        if(this.first === undefined){
            this.first = newElem;
            this.last = newElem;
            newElem.isFirst = true;
            newElem.isLast = true;
        }
        else {
            newElem.previous = this.last;
            this.last.isLast = false;
            newElem.isLast = true;
            this.last.next = newElem;
            this.last = newElem;
        }
        this.count = this.count + 1;
    };


    /**
     * Adds the given item to the beginning of the list
     * @param elem
     */
    LinkedList.prototype.addFirst = function(elem){
        var newElem = new ListElement(elem);
        if(this.first === undefined){
            this.first = newElem;
            this.last = newElem;
            newElem.isFirst = true;
            newElem.isLast = true;
        }
        else {
            newElem.next = this.first;
            this.first.isFirst = false;
            this.first.previous = newElem;
            newElem.isFirst = true;
            this.first = newElem;
        }
        this.count = this.count + 1;
    };

    /**
     * Returns true if the given object exists in the list
     * @param obj
     * @returns {boolean}
     */
    LinkedList.prototype.contains = function(obj){
        var containsResult = this.containsObjResult(obj);
        if(containsResult.resultIndex > -1){
            return true;
        }
        else {
            return false;
        }
    };

    /**
     * Returns an object with two attributes
     *
     * result: The object being searched for, if it existed, otherwise undefined
     * resultIndex: The index at which the result was found, otherwise -1
     *
     * @param obj
     * @returns {*}
     */
    LinkedList.prototype.containsObjResult = function(obj){
        var iterator = this.iterator();
        var indexCount = 0;

        while(iterator.hasNext()){
            var node = iterator.next();
            if(node.value === obj){
                return {
                    result: node,
                    resultIndex: indexCount
                };
            }
            indexCount = indexCount + 1;
        }
        return  {
            result: undefined,
            resultIndex: -1
        };
    };


    /**
     * Removes the given object from the list
     * @param obj
     */
    LinkedList.prototype.remove = function(obj){

        if(this.count === 0){
            return;
        }

        var containsResult = this.containsObjResult(obj);

        if(containsResult.resultIndex > -1){
            var nodeToRemove = containsResult.result;

            if(this.count === 1){
                this.empty();
                return;
            }

            //More than one element, make sure we update the references
            if(nodeToRemove.isFirst){
                nodeToRemove.next.isFirst = true;
                this.first = nodeToRemove.next;
            }
            else if(nodeToRemove.isLast){
                nodeToRemove.previous.isLast = true;
                this.last = nodeToRemove.previous;
                this.last.next = undefined;

            }
            else {
                //It's somewhere in the middle
                nodeToRemove.previous.next = nodeToRemove.next;
                nodeToRemove.next.previous = nodeToRemove.previous;
            }

            this.count = this.count - 1;
        }
        else {
            //Element wasn't in list
        }
    };

    /**
     * Does a simple print of the list
     */
    LinkedList.prototype.print = function(){
        if(this.first !== undefined){
            var nodeToPrint = this.first;
            while(nodeToPrint !== undefined){
                this.printNode(nodeToPrint);
                nodeToPrint = nodeToPrint.next;
            }
        }
        else {
            console.log("Empty list");
        }
    };

    /**
     * Prints the value of the node
     * @param node
     */
    LinkedList.prototype.printNode = function(node){
        console.log(node);
    };

    /**
     * Returns an iterator for the list
     * @returns {CreateLinkedList.LinkedListIterator}
     */
    LinkedList.prototype.iterator = function(){
        return new LinkedListIterator(this.first)
    };

    return new LinkedList();
}

module.exports.CreateLinkedList = CreateLinkedList;

