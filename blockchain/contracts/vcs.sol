pragma solidity ^0.4.25;


//Create factory


contract CreateVideo{
    address[] private deployedContract;
    address public currentContract;
    
    function Create() external{
        address newContract = new Upload();//instantiating new contract syntax
        deployedContract.push(newContract);
        currentContract =getDeployedContract();
        
    }
    
    function getDeployedContract() private view returns(address){
        return deployedContract[deployedContract.length-1];
    }
}

// UPLOAD factory contract section

contract Upload{
    
    address[] private deployedContractList;
    
    
    
    
    function CreateNewMasterBranch() external{
        address newContract = new Version(msg.sender);//instantiating new contract syntax
        deployedContractList.push(newContract);
        
    }
    
    
    function getDeployedContracts() external view returns(address[]){
        return deployedContractList;
    }

    
    
}

//main contract section
contract Version{
    
    address public owner;
    string[] private versions;
    uint version_count;
    
    address[] private forkers;
    
    
    struct Editor{
        address editor_address;
        bool access;
        bool mergerequest;
        uint editCount;
    } 
    
    struct Request{
        string description;
        address merger_address;
        
        
        
    }
    Request[] public requests;
    
    address[] private editor_list;
    
    mapping(address => Editor) editor;
    
    
    
    constructor(address sender) public{
        
        owner=sender;
        editor[owner].mergerequest=true;
        editor[owner].editor_address=owner;
        editor[owner].access=true;
        
       
    }
    
   
    
    modifier access(address sender){
        require(editor[sender].access==true);
        _;
    }
    
    modifier onlyOwner(){
        require(msg.sender==owner);
        _;
    }
    modifier approved(){
        
        require(editor[msg.sender].mergerequest==true);
        _;
    }
       
   
   event PushToDB(string pushToDB)   ; 
   function UploadVideo(string location) external onlyOwner{//event to psuh node to C.DB
        
        versions.push(location);    
        version_count++;
       
        editor_list.push(msg.sender);  
       
        editor[msg.sender].editCount++;
        
        emit PushToDB("PUSH THE NODE TO DB");
        
    
        
   }
    event newUpdateAvailable(string path);
    function Merge(string location) external approved{//event needed to show that a merge was done and now users have an option to update to latest version
       
        
        versions.push(location);    
        version_count++;
       
        editor_list.push(msg.sender);  
        
        editor[msg.sender].mergerequest=false;
       
        editor[msg.sender].editCount++;
        
        
        emit newUpdateAvailable(location);
   }
   function f() private{
       //access modifiers with timeframe:
       
        editor[msg.sender].editor_address=msg.sender;
        editor[msg.sender].access=true;
        editor[msg.sender].mergerequest=false;
        

     
        
    }
    
   function fork() external returns(string) {
       
       require(msg.sender!=owner);
       
       forkers.push(msg.sender);
       return(versions[version_count-1]);
       f();
       
   }
    
   event MergeRequestsAvailable(uint length);
   function RequestToMerge(string description) external access(msg.sender){//event to notify that merge requests are made
        
         Request memory newRequest=Request({ ///memory is important cuz Rqequest is storage 
          description: description,
          merger_address : msg.sender
          
          
        });
       requests.push(newRequest);
       emit MergeRequestsAvailable(requests.length);
        
    }
    
    function getRequestsCount() external view returns(uint){
        
        return(requests.length);
        
    }
    
    event Approved(address user,bool approve);
    function Approve(address merger) external onlyOwner{//event to show who was approved 
        
        editor[merger].mergerequest=true;
        emit Approved(merger,editor[merger].mergerequest);
        delete requests;
    }
    
   
   
   function getEditorList() external view returns(address[]){
       
       return(editor_list);
       
   }
   
   function getForkerList() external view returns(address[]){
       return(forkers);
   }
   
   function PushToOffchainArray() external view returns(address){
       return(forkers[forkers.length-1]);
   }
   
   function BasicINcentiveMOdel(address candidate) external view returns(uint){
       
       return(editor[candidate].editCount);
       
   }
    
   
    
    
    
}
