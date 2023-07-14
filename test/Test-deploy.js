const { ethers } = require("hardhat")
const { expect, assert } = require("chai")
const { TransactionResponse } = require("ethers")
//const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace")

describe("SimpleStorage", function () {
    let simpleStorageFactory, simpleStorage
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
    })
    it("Should Start with a fav num of 0", async function () {
        const currentvalue = await simpleStorage.retrieve()
        const expectedvalue = "0"
        assert.equal(currentvalue.toString(), expectedvalue)
    })
    it("It should update when we store", async function () {
        const expectedvalue = "7"
        const transactionResponse = await simpleStorage.store(expectedvalue)
        await transactionResponse.wait(1)

        const currentvalue = await simpleStorage.retrieve()
        assert.equal(currentvalue.toString(), expectedvalue)
    })
})
