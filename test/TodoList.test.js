const { assert } = require("chai");

const TodoList = artifacts.require('./TodoList.sol');

contract('TodoList', (accounts) => {
    before(async () => {
        this.todoList = await TodoList.deployed();
    })

    it('create tasks', async () => {
        const result = await this.todoList.createTask('A new task');
        const taskCount = await this.todoList.taskCount();
        assert.equal(taskCount, 2);

        const event = result.logs[0].args;
        assert.equal(event.id.toNumber(), 2);
        assert.equal(event.content, 'A new task');
        assert.equal(event.completed, false);
    })
})