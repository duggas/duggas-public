
"use strict";

/**
 * Creates and returns an instance of a BinarySearchTree.
 * @returns {BST.BinarySearchTree}
 * @constructor
 */
function BST(){

    /**
     * BinarySearchTree constructor
     * @constructor
     */
    function BinarySearchTree(){
        var rootNode = undefined;
        this.comparator = new IntegerComparator();
    }

    /**
     * Returns (but does not remove) the node with the given key
     * @param key
     * @param node
     * @returns {*}
     */
    BinarySearchTree.prototype.find = function(key, node){

        if(node === undefined){
            return this.find(key, this.rootNode);
        }
        else {

            if(this.comparator.compare(key, node.key) === 0){
                return node;
            }
            else if(this.comparator.compare(key, node.key) === -1){
                if(node.leftChild !== undefined){
                    return this.find(key, node.leftChild);
                }
                else {
                    return undefined;
                }
            }
            else {
                if(node.rightChild !== undefined){
                    return this.find(key, node.rightChild);
                }
                else {
                    return undefined;
                }
            }
        }
    };

    /**
     * Returns and removes the node with the given key
     * @param key
     * @returns {*}
     */
    BinarySearchTree.prototype.get = function(key){
        var foundNode = this.find(key);

        if(foundNode !== undefined){

            //First delete then return
            this.delete(foundNode);
            return foundNode;
        }
        return undefined;

    };


    /**
     * Removes the node represented by the given delete value.
     * If the given delete value is an object, then it will be treated as the node
     * to be deleted. Otherwise the delete value is treated as the key to be deleted.
     *
     * @param deleteVal
     */
    BinarySearchTree.prototype.delete = function(deleteVal){
        var nodeToDelete = undefined;

        if(typeof deleteVal === "object"){
            nodeToDelete = deleteVal;
        }
        else {
            nodeToDelete = this.find(deleteVal);
        }

        if(nodeToDelete !== undefined){

            var parentNode = nodeToDelete.parentNode;

            if(!nodeToDelete.hasChildren()){

                //Remove the parents reference to the child
                if(this.comparator.compare(nodeToDelete.key, parentNode.key) === -1){
                    parentNode.leftChild = undefined;
                }
                else {
                    parentNode.rightChild = undefined;
                }
            }
            else {

                //If one child exists, this replaces the node being removed
                if(nodeToDelete.leftChild === undefined && nodeToDelete.rightChild !== undefined){
                    //The right child moves up the tree

                    //The right child's parent is now the parent of the node we're deleting
                    nodeToDelete.rightChild.parentNode = parentNode;

                    if(this.comparator.compare(nodeToDelete.key, parentNode.key) === -1){
                        //Reset the left pointer
                        parentNode.leftChild = nodeToDelete.rightChild;
                    }
                    else {
                        parentNode.rightChild = nodeToDelete.rightChild;
                    }
                }
                else if(nodeToDelete.rightChild === undefined && nodeToDelete.leftChild !== undefined){
                    //The left child moved up the tree

                    //The left child's parent is now the parent of the node we're deleting
                    nodeToDelete.leftChild.parentNode = parentNode;

                    if(this.comparator.compare(nodeToDelete.key, parentNode.key) === -1){
                        //Reset the left pointer
                        parentNode.leftChild = nodeToDelete.leftChild;
                    }
                    else {
                        parentNode.rightChild = nodeToDelete.leftChild;
                    }
                }
                else if(nodeToDelete.leftChild !== undefined && nodeToDelete.rightChild !== undefined){
                    //Two children exist
                    var replacement =  nodeToDelete.leftChild;
                    var replacementParent = nodeToDelete;

                    while (replacement.rightChild !== undefined){
                        replacementParent = replacement;
                        replacement = replacement.rightChild;
                    }

                    if(replacementParent !== nodeToDelete){
                        replacementParent.rightChild = replacement.leftChild;
                        replacement.leftChild = nodeToDelete.leftChild;
                    }

                    replacement.rightChild = nodeToDelete.rightChild;

                    if(this.comparator.compare(nodeToDelete.key, parentNode.key) === -1){
                        parentNode.leftChild = replacement;
                    }
                    else {
                        parentNode.rightChild = replacement;
                    }
                }
            }
        }
    };

    /**
     * Inserts a new element into the tree. Has added support for an empty tree
     * @param key
     * @param value
     */
    BinarySearchTree.prototype.insert = function(key, value){
        if(this.rootNode === undefined){
            this.rootNode = new BSTNode(key, value);
        }
        else {
            var newNode = new BSTNode(key, value);
            this.insertInternal(this.rootNode, newNode);
        }
    };

    /**
     * Inserts the given node into the tree. The insertion function rule is defined as:
     *
     * If the node being inserted is < the node against which we are currently comparing
     *  go left
     * else
     *  go right
     *
     * @param node - The node against which to compare the node being inserted
     *               to find the insertion position
     * @param nodeToInsert - The node to be inserted
     */
    BinarySearchTree.prototype.insertInternal = function(node, nodeToInsert){
        if(this.comparator.compare(node.key, nodeToInsert.key) === 1){
            if(node.leftChild === undefined){
                node.leftChild = nodeToInsert;
                nodeToInsert.parentNode = node;
            }
            else {
                this.insertInternal(node.leftChild, nodeToInsert);
            }
        }
        else if(this.comparator.compare(node.key, nodeToInsert.key) === 0){
            node.value = nodeToInsert.value;
        }
        else {
            if(node.rightChild === undefined){
                node.rightChild = nodeToInsert;
                nodeToInsert.parentNode = node;
            }
            else {
                this.insertInternal(node.rightChild, nodeToInsert);
            }
        }
    };

    /**
     * Prints the tree in order
     */
    BinarySearchTree.prototype.printTree = function(){
        var inOrderTreeValues = this.traverseTree();
        console.log(inOrderTreeValues);
    };


    /**
     *
     * @returns {*}
     */
    BinarySearchTree.prototype.traversTreeBreadthFirst = function(){
        if(this.rootNode !== undefined){
             return this.traversTreeBreadthFirstInternal([this.rootNode], []);
        }
        else {
            console.log("empty tree");
            return [];
        }
    };


    /**
     *
     * @param nodeArray
     * @param resultHolder
     * @returns {*}
     */
    BinarySearchTree.prototype.traversTreeBreadthFirstInternal = function(nodeArray, resultHolder){
        var nextNodeRow = [];
        var thisNodeRow = [];

        for(var i = 0; i < nodeArray.length; i++){
            /*
            For each node, add it to the result array while also adding
            its left and right children to a new node array holding the next row of nodes
            */

            thisNodeRow.push(nodeArray[i]);

            if(nodeArray[i].leftChild !== undefined){
                nextNodeRow.push(nodeArray[i].leftChild);
            }

            if(nodeArray[i].rightChild !== undefined){
                nextNodeRow.push(nodeArray[i].rightChild);
            }
        }

        resultHolder.push(thisNodeRow);

        if(nextNodeRow.length > 0){
            return this.traversTreeBreadthFirstInternal(nextNodeRow, resultHolder);
        }
        return resultHolder;
    };


    /**
     * Performs an in-order traversal of the tree and returns
     * an array with all values. Has the added ability to handle an empty tree
     * @returns {*}
     */
    BinarySearchTree.prototype.traverseTree = function(){
        if(this.rootNode !== undefined){
            return this.traverseTreeInternal(this.rootNode, []);
        }
        else {
            console.log("empty tree");
        }
    };

    /**
     * Performs an in-order traversal of the tree and returns an array
     * containing all values
     * @param node
     */
    BinarySearchTree.prototype.traverseTreeInternal = function(node, resultHolder){

        if(node.leftChild !== undefined){
            this.traverseTreeInternal(node.leftChild, resultHolder);
        }

        resultHolder.push({
            "key" : node.key,
            "value": node.value
        });

        if(node.rightChild !== undefined){
            this.traverseTreeInternal(node.rightChild, resultHolder);
        }

        return resultHolder;
    };


    /**
     * Represents a single node in the tree
     * @param key
     * @param value
     * @constructor
     */
    function BSTNode(key, value){
        this.key = key;
        this.value = value;
        this.leftChild = undefined;
        this.rightChild = undefined;
        this.parentNode = undefined;
    }

    /**
     * Prints the node's key and value to the song
     */
    BSTNode.prototype.print = function(){
        console.log(this.key + ":" + this.value);
    };

    BSTNode.prototype.toString = function(){
        return this.key + ":" + this.value;
    };

    /**
     * Returns true if the given node has any children
     * @returns {boolean}
     */
    BSTNode.prototype.hasChildren = function(){
        return (this.leftChild !== undefined || this.rightChild != undefined);
    };

    /**
     * A simple integer comparator used for key comparison
     * @constructor
     */
    function IntegerComparator(){}

    /**
     * Implements the compare method for the IntegerComparator
     * @param valueOne
     * @param valueTwo
     * @returns {number}
     */
    IntegerComparator.prototype.compare = function(valueOne, valueTwo){
        if(valueOne === valueTwo) {
            return 0;
        }
        else if(valueOne < valueTwo){
            return -1;
        }
        return 1;
    };

    return new BinarySearchTree();


}
