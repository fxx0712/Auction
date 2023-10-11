//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

//使用ERC20交易
import "./MyToken.sol";

contract OpenAuction is MyToken {
    
    //version
    uint public ver=5;
    
	//拍卖开始时间
    uint public auctionStart_fxx;
	
	//拍卖期限
    uint public auctionLimit_fxx;

    //拍卖品名
    string public nameOf_fxx;

    //房屋层数
    uint public plies_fxx;

    //房屋面积
    uint public area_fxx;

    //房屋地区
    string public district_fxx;

    //产权期限（年）
    uint public year_fxx;

    //出估价（起拍价）
    uint public money_fxx;

    //商品确权
    mapping(address => bytes32) owner_fxx;

    //是否确权 唯一标识
    mapping(bytes32 => bool) confirmation_fxx;
	
	//拍卖受益人
    address payable beneficiary_fxx;

    //最高出价者
    address payable highestBidder_fxx;

    //最高出价
    uint public highestBid_fxx;

	//拍卖开始标志
    bool public startFlg_fxx;
	
    //拍卖结束标志
    bool public endFlg_fxx;

    //更高出价事件
    event HighBidEvt_fxx(address bidder, uint amount);
	
	//拍卖开始事件
    event AuctionStartEvt_fxx(address starter);
	
    //拍卖结束事件
    event AuctionEndedEvt_fxx(address winner, uint amount);

	//出价事件
    event BidEvt_fxx(address bidder, uint amount);

     //ERC20转换
    function ChangeERC20() public payable{
        IERC20(address(this)).transfer(msg.sender,msg.value);
    }
	
    //开始出价事件
    function createAuction(string memory _name,uint _plies,uint _area,string memory _district,uint _year,uint _money,uint _timeLimit)public{
        bytes32 hashs = keccak256(abi.encodePacked(msg.sender,_name));
        require(confirmation_fxx[hashs]);

        require(!startFlg_fxx, "auction already start");
        //定义局部变量
        nameOf_fxx = _name;
        plies_fxx = _plies;
        area_fxx = _area;
        district_fxx = _district;
        year_fxx = _year;
        money_fxx = _money;
	    beneficiary_fxx = payable(msg.sender);
	    auctionStart_fxx = block.timestamp;

	   //设置拍卖期限	
       auctionLimit_fxx = block.timestamp + _timeLimit;

    }

    //确认权限 物品是谁的
    function IsOwner(string memory _name) public {
        bytes32 hashs = keccak256(abi.encodePacked(msg.sender,_name));
        
        //唯一标识
        require(!confirmation_fxx[hashs]);
        owner_fxx[msg.sender] = hashs;
        confirmation_fxx[hashs] = true;
    }

    //进行出价
    function  payme(uint _money) public {
	    emit BidEvt_fxx(msg.sender, _money);
	
        //拍卖需已经开始
        require(startFlg_fxx, "auction not yet start");
		 
		//最高出价者不是当前出价竞标者（即已经是最高出价者没有再次出价太高自己的最高价格）
		require(highestBidder_fxx != msg.sender, "You are highest bidder");
		
        //区块时间需早于拍卖期限
        // require(block.timestamp <= auctionLimit_fxx, "auction ended");

        //确认出价是否低于起拍价
        require(_money >= money_fxx , "lower than the starting price");

        //出价需高于最高金额
        require(_money > highestBid_fxx, "less than highest bid");

		//拍卖开始时的最高出价金额为0
		//若不为0，代表已经有人出过价
		//应该将前一位出价者的拍卖金退还
        if (highestBid_fxx != 0) {
          IERC20(address(this)).transfer(highestBidder_fxx,_money);
        }
		
		//记录新的最高出价者与金额
        highestBidder_fxx = payable(msg.sender); 
        highestBid_fxx = _money;
         
        //发送更高出价事件
        emit HighBidEvt_fxx(msg.sender, _money);
    }

	//启动拍卖活动
	function setAuctionStart() public {
	   //前提是拍卖还没开始
       require(!startFlg_fxx, "auction already start");
	
    //收取手续费
       approve(address(this),money_fxx * 1 / 10);
       IERC20(address(this)).transferFrom(msg.sender,address(this),money_fxx * 1 / 10);

	   //设置拍卖已开始
	   startFlg_fxx = true;
	   
	   //拍卖开始事件
	   emit AuctionStartEvt_fxx(msg.sender);
    }

    //结束拍卖
    function setAuctionEnd() public {
        // bytes32 hashs = keccak256(abi.encodePacked(highestBidder_fxx,_name));
        // require(confirmation_fxx[hashs]);
        //区块时间需大于拍卖期限
        require(block.timestamp >= auctionLimit_fxx, "auction not yet ended");
        
        //拍卖需还没设置为已结束		
        require(!endFlg_fxx, "auction already ended");

        //设置拍卖结束
        endFlg_fxx = true;
        emit AuctionEndedEvt_fxx(highestBidder_fxx, highestBid_fxx);

        //将最高竞标金额，移交给给主持人
        // beneficiary.transfer(highestBid);
        IERC20(address(this)).transfer(beneficiary_fxx,highestBid_fxx);
    }

    //当结束上一次拍卖 ，开始新拍卖项目
    function reStart()public{
        //开始新的拍卖事件
        require(endFlg_fxx, "Start a new auction.");

        //定义新的拍卖品
        nameOf_fxx = "";
        money_fxx = 0;
        plies_fxx = 0;
        area_fxx = 0;
        district_fxx = "";
        year_fxx = 0;

	    beneficiary_fxx = payable(address(0));
	    auctionStart_fxx = 0;
	   //在每次拍卖前都要重置拍卖
       auctionLimit_fxx = 0;
       startFlg_fxx = false;
       endFlg_fxx = false;
       highestBidder_fxx = payable(address(0));
        highestBid_fxx = 0;
    }

    //房屋过户
    function move(string memory _name) public{
        bytes32 hashs = keccak256(abi.encodePacked(highestBidder_fxx,_name));
        
    //标识
        require(!confirmation_fxx[hashs]);
        owner_fxx[highestBidder_fxx] = hashs;
        confirmation_fxx[hashs] = true;
        bytes32 hashOld = keccak256(abi.encodePacked(beneficiary_fxx,_name));
        confirmation_fxx[hashOld] = false;
    }

}