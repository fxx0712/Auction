const web3 = new Web3(Web3.givenProvider);
//let web3 = new Web3('ws://localhost:8545');
console.log("web3", web3);

let fxxaccounts = [];


web3.eth.getAccounts().then(function (accounts) {
	  fxxaccounts = accounts
	  console.log(fxxaccounts[0])
	});




// //var subscription = web3.eth.subscribe('logs', {
// //	    address: '0x539225cFC085BFe6f7862738178b5D80Dd2cF6F9',
// //topics: ['0x12345...']
// //	}, function(error, result){
// //	    if (!error)
// //	        console.log(result);
// //	});

        



// var myContract = new web3.eth.Contract(abi, '0x4b24808e1D15E45Fc1c0ac04bbc4d1A9e0F1140F');
// console.log("myContract==>", myContract)

// myContract.methods.getOwners().call().then(function (receipt) {

// 	console.log("call getOwner==>", receipt)
// });



// $("#btn_confirmTransaction").click(function () {
// 	txid_ = $("#txid").val()
// 	console.log("txid", txid_)
// 	myContract.methods.confirmTransaction(txid_).send({
// 		from: fxxaccounts[0],
// 		gas: 1500000,
// 		gasPrice: "300000000000"
// 	}).on('transactionHash', function (hash) {
// 		console.log("transactionHash", hash)
// 	})
// 		.on('receipt', function (receipt) {
// 			console.log("receipt", receipt)
// 		})
// 		.on('confirmation', function (confirmationNumber, receipt) {
// 			console.log("confirmation  confirmationNumber", confirmationNumber)
// 			console.log("confirmation  receipt", receipt)
// 		})
// 		.on('error', function (error, receipt) {
// 			console.log("error", receipt)
// 		})
// }
// )

const abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "winner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "AuctionEndedEvt_fxx",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "starter",
				"type": "address"
			}
		],
		"name": "AuctionStartEvt_fxx",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "bidder",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "BidEvt_fxx",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "bidder",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "HighBidEvt_fxx",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "ChangeERC20",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "IsOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "area_fxx",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "auctionLimit_fxx",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "auctionStart_fxx",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_plies",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_area",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_district",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_year",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_money",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_timeLimit",
				"type": "uint256"
			}
		],
		"name": "createAuction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "district_fxx",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "endFlg_fxx",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "highestBid_fxx",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "money_fxx",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "move",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "nameOf_fxx",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_money",
				"type": "uint256"
			}
		],
		"name": "payme",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "plies_fxx",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "reStart",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "setAuctionEnd",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "setAuctionStart",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "startFlg_fxx",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ver",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "year_fxx",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
var myContract = new web3.eth.Contract(abi, '0x3D65785BfcEfD81E9B24Bd6E32947daFf4cFb83D');
console.log("myContract==>", myContract)

//创建拍卖
$("#btn1").click(function(){
	myContract.methods.createAuction($("#name").val(),$("#plies").val(),$("#area").val(),$("#district").val(),$("#year").val(),$("#money").val(),$("#timeLimit").val()).send({
		from:fxxaccounts[0],

	}).then(function (receipt) {

		console.log("", receipt)
	});
})

//开始拍卖
$("#btn2").click(function(){
	myContract.methods.setAuctionStart().send({
		from:fxxaccounts[0],

	}).then(function (receipt) {

		console.log("", receipt)
	});
})


//拍卖
$("#btn3").click(function(){
	myContract.methods.payme($("#mon").val()).send({
		from:fxxaccounts[0]

	}).then(function (receipt) {

		console.log( receipt)
	});
})


//开始新拍卖
$("#btn4").click(function(){
	myContract.methods.reStart().send({
		from:fxxaccounts[0],

	}).then(function (receipt) {

		console.log("", receipt)
	});
})
// //ERC20
// $("#btn5").click(function(){
// 	myContract.methods.ChangeERC20($("#account").val,$("#moneyy")).send({
// 		from:fxxaccounts[0],

// 	}).then(function (receipt) {

// 		console.log("", receipt)
// 	});
// })
//确权
$("#btn6").click(function(){
	// console.log(1);
	myContract.methods.IsOwner($("#_name").val()).send({
		from:fxxaccounts[0],

	}).then(function (receipt) {

		console.log("", receipt)
	});
})
//结束拍卖
$("#btn7").click(function(){
	myContract.methods.setAuctionEnd().send({
		from:fxxaccounts[0],

	}).then(function (receipt) {

		console.log("", receipt)
	});
})
//过户
$("#btn8").click(function(){
	myContract.methods.move($("#name").val()).send({
		from:fxxaccounts[0],

	}).then(function (receipt) {

		console.log("", receipt)
	});
})
