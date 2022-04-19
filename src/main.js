//import * as helper from './w3Helper.js';

const serverUrl = "https://bd6xpqfykho5.usemoralis.com:2053/server"; //Server url from moralis.io
const appId = "s9hVE8SmoSVGqcdEyp6eQhQmbFBVXxmvoMLPEaAU"; // Application id from moralis.io

//This is being used to hold the Web3API namespace
let token_obj;

//keeps track of if a user is logged in.
let logged_in;

//Tracks if user has a vote token
var has_token = false;

var voteamount1 = 0;
var voteamount2 = 0;
var voteamount3 = 0;
var voteamount4 = 0;

var vote_token_balance = 0;

disableButtons();
disableButtonsDown();

//Auto - Refreshes wallet balances every 35 seconds
var intervalId = window.setInterval(function() {
    getVoteBalances();
}, 15000);

var intervalId = window.setInterval(function() {
    tokenCheck();
}, 30000);

//Called when site is loading.
async function init() {
    await Moralis.start({ serverUrl, appId });
    await Moralis.enableWeb3();

    token_obj = await Moralis.Web3API.token;
    currentUser = await Moralis.User.current();
    global.user_profile.entity = currentUser;
    //If User is logged in
    if (currentUser) {
        logged_in = true;
        enableButtons();
        document.getElementById("login_button").innerText = "Logout";
        userAddress = currentUser.get('ethAddress');
        document.getElementById("current-wallet").innerText = "0x..." + userAddress.slice(38);
        setHelperData();
        console.log(global.user_profile.born);
        document.getElementById("logged_in_info").style.display = "block";
    }

    //If user is not logged in
    else {
        logged_in = false;
        disableButtons();
        disableButtonsDown();
        document.getElementById("login_button").innerText = "Sign in with MetaMask";
        document.getElementById("logged_in_info").style.display = "none";
    }
}

async function setHelperData() {
    global.user_profile.born = JSON.stringify(currentUser.createdAt);
    const options = { chain: 'bsc' }
    global.user_profile.balances = await Moralis.Web3API.account.getTokenBalances(options);
    global.user_profile.native_bal = await Moralis.Web3API.account.getNativeBalance(options);
}
//Controls the auto enable/disable of the buttons. Comment/uncomment based on how many cards you need. 
function enableButtons() {
    document.getElementById("vote_token_1_button").disabled = false;
    document.getElementById("vote_token_2_button").disabled = false;
    document.getElementById("vote_token_1_button").removeAttribute("title");
    document.getElementById("vote_token_2_button").removeAttribute("title");
}

function disableButtons() {
    document.getElementById("vote_token_1_button").disabled = true;
    document.getElementById("vote_token_2_button").disabled = true;
}

function enableButtonsDown() {
    document.getElementById("vote_token_1_down_button").disabled = false;
    document.getElementById("vote_token_2_down_button").disabled = false;
    document.getElementById("vote_token_1_down_button").removeAttribute("title");
    document.getElementById("vote_token_2_down_button").removeAttribute("title");
}

function disableButtonsDown() {
    document.getElementById("vote_token_1_down_button").disabled = true;
    document.getElementById("vote_token_2_down_button").disabled = true;
}

async function login() {
    try {
        currentUser = Moralis.User.current();
        if (!currentUser) {
            document.getElementById("login_button").innerText = "Authenticating...";
            currentUser = await Moralis.authenticate();
            userAddress = currentUser.get('ethAddress');
            document.getElementById("current-wallet").innerText = "0x..." + userAddress.slice(38);
            enableButtons();
            tokenCheck();
            setHelperData();
        } else {
            logOut();
        }
        document.getElementById("login_button").innerText = "Logout";
        document.getElementById("logged_in_info").style.display = "block";
        logged_in = true;
    } catch (error) {
        if (error.message == "MetaMask Message Signature: User denied message signature.") {
            alert("Login cancelled")
            document.getElementById("login_button").innerText = "Sign in with Metamask";
        }
    }
}
async function logOut() {
    currentUser = await Moralis.User.logOut();
    document.getElementById("login_button").innerText = "Sign in with Metamask";
    disableButtons();
    disableButtonsDown();
    document.getElementById("message").style.display = "none";
    document.getElementById("logged_in_info").style.display = "none";

    logged_in = false;
}

async function loginWC() {
    try {
        currentUser = Moralis.User.current();
        if (!currentUser) {
            document.getElementById("login_button_wc").innerText = "Authenticating...";
            currentUser = await Moralis.authenticate({ provider: "walletconnect", chainId: 56 });
            userAddress = currentUser.get('ethAddress');
            document.getElementById("current-wallet").innerText = "0x..." + userAddress.slice(38);
            enableButtons();
            tokenCheck();
            setHelperData();
        } else {
            logOutWC();
        }
        document.getElementById("login_button_wc").innerText = "Logout";
        document.getElementById("logged_in_info").style.display = "block";
        logged_in = true;
    } catch (error) {
        if (error.message == "User closed modal") {
            alert("Login cancelled")
            document.getElementById("login_button_wc").innerText = "Sign in with WalletConnect";
        }
    }
}

async function logOutWC() {
    currentUser = await Moralis.User.logOut();
    document.getElementById("login_button_wc").innerText = "Sign in with WalletConnect";
    disableButtons();
    disableButtonsDown();
    document.getElementById("message").style.display = "none";
    document.getElementById("logged_in_info").style.display = "none";

    logged_in = false;
}

async function tokenCheck() {
    let currentBalances = await Moralis.Web3API.account.getTokenBalances({ chain: 'bsc' });
    let currentBalancesFUD = await Moralis.Web3API.account.getTokenBalances({ chain: 'bsc' });
    vote_token = currentBalances.filter(function(v) {
        return v.token_address == 0x73Ae8e73cc8374a7e3A983637091624041E5B19D;
    });
    vote_token_down = currentBalancesFUD.filter(function(x) {
        return x.token_address == 0x85998a72274fc3639d2367c49b426c1Ab3BE86A8;
    });
    if (vote_token.length != 0) {
        has_token = true;
        document.getElementById("message").style.display = "none";
        vote_token_balance = (vote_token[0].balance);
        document.getElementById("dvt-balance-current").innerText = vote_token_balance;
        enableButtons();
    } else if (vote_token.length == 0) {
        vote_token_balance = 0;
        document.getElementById("dvt-balance-current").innerText = vote_token_balance;
        has_token = false;
        disableButtons();
        document.getElementById("vote_token_1_button").title = 'Insufficent DVT Balance';
        document.getElementById("vote_token_2_button").title = 'Insufficent DVT Balance';
    }
    if (vote_token_down.length != 0) {
        has_down_token = true;
        document.getElementById("message").style.display = "none";
        fud_vote_token_balance = (vote_token_down[0].balance * .1);
        document.getElementById("fud-balance-current").innerText = fud_vote_token_balance
        enableButtonsDown();
    } else if (vote_token_down.length == 0) {
        fud_vote_token_balance = 0;
        document.getElementById("fud-balance-current").innerText = fud_vote_token_balance;
        has_down_token = false;
        disableButtonsDown();
        document.getElementById("vote_token_1_down_button").title = 'Insufficent DDVT Balance';
        document.getElementById("vote_token_2_down_button").title = 'Insufficent DDVT Balance';

    }
}
//Start copy here for new card
async function voteOne() {
    //Make sure to change the voteamount1 to whatever number you need for the new card
    if (voteamount1 == 0) {
        alert("Please Enter Number of Votes");
        return;
    } else if (voteamount1 > vote_token_balance) {
        scroll(0, 0);
        document.getElementById("message").style.display = "block";
        document.getElementById("message").innerText = "Insufficent DvT in Wallet";
        setTimeout(() => { document.getElementById("message").style.display = "none"; }, 10000);
        return;
    }
    const tx = await Moralis.transfer({
        type: "erc20",
        amount: Moralis.Units.Token(voteamount1, "0"),
        //Change the receiver address to the wallet that will be receiving the token
        receiver: "0xF0858a63193f3958D42AC6d2fD21B84CEC5291C8",
        contractAddress: "0x73Ae8e73cc8374a7e3A983637091624041E5B19D",
        awaitReceipt: false
    });
    document.getElementById("message").innerText = "Submitting Vote...";
    tx.on("error", (error) => {
        scroll(0, 0);
        document.getElementById("message").style.display = "block";
        document.getElementById("message").innerText = "Vote Failed";
        setTimeout(() => { document.getElementById("message").style.display = "none"; }, 10000);
    });
    tx.on("receipt", (receipt) => {
        scroll(0, 0);
        document.getElementById("message").style.display = "block";
        document.getElementById("message").style.color = "green";
        document.getElementById("message").innerText = "Vote Successful!";
        updatingBalancesText();
        setTimeout(() => { document.getElementById("message").style.display = "none"; }, 10000);
        document.getElementById("message").style.color = "white";
        setTimeout(() => { tokenCheck(); }, 2000);
        setTimeout(() => { getVoteBalances(); }, 5000);
        setTimeout(() => { getVoteBalances(); }, 5000);
        setTimeout(() => { tokenCheck(); }, 5000);
    });
}
//Stop copy here
async function voteTwo() {
    if (voteamount2 == 0) {
        alert("Please Enter Number of Votes");
        return;
    } else if (voteamount2 > vote_token_balance) {
        scroll(0, 0);
        document.getElementById("message").style.display = "block";
        document.getElementById("message").innerText = "Insufficent DvT in Wallet";
        setTimeout(() => { document.getElementById("message").style.display = "none"; }, 10000);
        return;
    }
    const tx = await Moralis.transfer({
        type: "erc20",
        amount: Moralis.Units.Token(voteamount2, "0"),
        receiver: "0x26F4C1C79dA2db3E298053B1416089783A796c70",
        contractAddress: "0x73Ae8e73cc8374a7e3A983637091624041E5B19D",
        awaitReceipt: false
    });
    document.getElementById("message").innerText = "Submitting Vote...";
    tx.on("error", (error) => {
        scroll(0, 0);
        document.getElementById("message").style.display = "block";
        document.getElementById("message").innerText = "Vote Failed";
        setTimeout(() => { document.getElementById("message").style.display = "none"; }, 10000);
    });
    tx.on("receipt", (receipt) => {
        scroll(0, 0);
        document.getElementById("message").style.display = "block";
        document.getElementById("message").style.color = "green";
        document.getElementById("message").innerText = "Vote Successful!";
        updatingBalancesText();
        setTimeout(() => { document.getElementById("message").style.display = "none"; }, 10000);
        document.getElementById("message").style.color = "white";
        setTimeout(() => { tokenCheck(); }, 2000);
        setTimeout(() => { getVoteBalances(); }, 5000);
        setTimeout(() => { getVoteBalances(); }, 5000);
        setTimeout(() => { tokenCheck(); }, 5000);
    });
}

async function voteOneDown() {
    //Make sure to change the voteamount1 to whatever number you need for the new card
    if (voteamount1 == 0) {
        alert("Please Enter Number of Votes");
        return;
    } else if (voteamount1 > fud_vote_token_balance) {
        scroll(0, 0);
        document.getElementById("message").style.display = "block";
        document.getElementById("message").innerText = "Insufficent DDvT in Wallet";
        setTimeout(() => { document.getElementById("message").style.display = "none"; }, 10000);
        return;
    }
    const tx = await Moralis.transfer({
        type: "erc20",
        amount: Moralis.Units.Token(voteamount1, "1"),
        //Change the receiver address to the wallet that will be receiving the token
        receiver: "0xF0858a63193f3958D42AC6d2fD21B84CEC5291C8",
        contractAddress: "0x85998a72274fc3639d2367c49b426c1Ab3BE86A8",
        awaitReceipt: false
    });
    document.getElementById("message").innerText = "Submitting Vote...";
    tx.on("error", (error) => {
        scroll(0, 0);
        document.getElementById("message").style.display = "block";
        document.getElementById("message").innerText = "Vote Failed";
        setTimeout(() => { document.getElementById("message").style.display = "none"; }, 10000);
    });
    tx.on("receipt", (receipt) => {
        scroll(0, 0);
        document.getElementById("message").style.display = "block";
        document.getElementById("message").style.color = "green";
        document.getElementById("message").innerText = "Vote Successful!";
        updatingBalancesText();
        setTimeout(() => { document.getElementById("message").style.display = "none"; }, 10000);
        document.getElementById("message").style.color = "white";
        setTimeout(() => { tokenCheck(); }, 2000);
        setTimeout(() => { getVoteBalances(); }, 5000);
        setTimeout(() => { getVoteBalances(); }, 5000);
        setTimeout(() => { tokenCheck(); }, 5000);
    });
}
//Stop copy here
async function voteTwoDown() {
    if (voteamount2 == 0) {
        alert("Please Enter Number of Votes");
        return;
    } else if (voteamount2 > fud_vote_token_balance) {
        scroll(0, 0);
        document.getElementById("message").style.display = "block";
        document.getElementById("message").innerText = "Insufficent DDvT in Wallet";
        setTimeout(() => { document.getElementById("message").style.display = "none"; }, 10000);
        return;
    }
    const tx = await Moralis.transfer({
        type: "erc20",
        amount: Moralis.Units.Token(voteamount2, "1"),
        receiver: "0x26F4C1C79dA2db3E298053B1416089783A796c70",
        contractAddress: "0x85998a72274fc3639d2367c49b426c1Ab3BE86A8",
        awaitReceipt: false
    });
    document.getElementById("message").innerText = "Submitting Vote...";
    tx.on("error", (error) => {
        scroll(0, 0);
        document.getElementById("message").style.display = "block";
        document.getElementById("message").innerText = "Vote Failed";
        setTimeout(() => { document.getElementById("message").style.display = "none"; }, 10000);
    });
    tx.on("receipt", (receipt) => {
        scroll(0, 0);
        document.getElementById("message").style.display = "block";
        document.getElementById("message").style.color = "green";
        document.getElementById("message").innerText = "Vote Successful!";
        updatingBalancesText();
        setTimeout(() => { document.getElementById("message").style.display = "none"; }, 10000);
        document.getElementById("message").style.color = "white";
        setTimeout(() => { tokenCheck(); }, 2000);
        setTimeout(() => { getVoteBalances(); }, 5000);
        setTimeout(() => { getVoteBalances(); }, 5000);
        setTimeout(() => { tokenCheck(); }, 5000);
    });
}

async function getVoteBalances() {
    //Vote Token Balances
    let balances1 = await Moralis.Web3API.account.getTokenBalances({ chain: 'bsc', address: "0xF0858a63193f3958D42AC6d2fD21B84CEC5291C8" });
    result1 = balances1.filter(function(e) {
        return e.token_address == 0x73Ae8e73cc8374a7e3A983637091624041E5B19D;
    });
    let balances2 = await Moralis.Web3API.account.getTokenBalances({ chain: 'bsc', address: "0x26F4C1C79dA2db3E298053B1416089783A796c70" });
    result2 = balances2.filter(function(f) {
        return f.token_address == 0x73Ae8e73cc8374a7e3A983637091624041E5B19D;
    });

    await wait(1000);
    //Downvote Token Balances
    let balancesDown1 = await Moralis.Web3API.account.getTokenBalances({ chain: 'bsc', address: "0xF0858a63193f3958D42AC6d2fD21B84CEC5291C8" });
    resultDown1 = balancesDown1.filter(function(j) {
        return j.token_address == 0x85998a72274fc3639d2367c49b426c1Ab3BE86A8;
    });
    let balancesDown2 = await Moralis.Web3API.account.getTokenBalances({ chain: 'bsc', address: "0x26F4C1C79dA2db3E298053B1416089783A796c70" });
    resultDown2 = balancesDown2.filter(function(k) {
        return k.token_address == 0x85998a72274fc3639d2367c49b426c1Ab3BE86A8;
    });
    ///
    if (result1.length == 1) {
        document.getElementById("vote-token-1-count").innerText = (result1[0].balance);
        result1Total = result1[0].balance;
    } else {
        document.getElementById("vote-token-1-count").innerText = "0";
        result1Total = 0;
    };
    if (result2.length == 1) {
        document.getElementById("vote-token-2-count").innerText = (result2[0].balance);
        result2Total = result2[0].balance;
    } else {
        document.getElementById("vote-token-2-count").innerText = "0";
        result2Total = 0;
    };
    ///
    if (resultDown1.length == 1) {
        document.getElementById("downvote-token-1-count").innerText = (resultDown1[0].balance * .1);
        resultDown1Total = (resultDown1[0].balance * .1);
    } else {
        document.getElementById("downvote-token-1-count").innerText = "0";
        resultDown1Total = 0;
    };
    if (resultDown2.length == 1) {
        document.getElementById("downvote-token-2-count").innerText = (resultDown2[0].balance * .1);
        resultDown2Total = (resultDown2[0].balance * .1);
    } else {
        document.getElementById("downvote-token-2-count").innerText = "0";
        resultDown2Total = 0;
    };

    //Final Vote Count
    if (resultDown1.length == 1 && result1.length == 1) {
        document.getElementById("total-vote-count1").innerText = (result1[0].balance - (resultDown1[0].balance * .1));
    } else {
        document.getElementById("total-vote-count1").innerText = (result1Total - resultDown1Total);
    };
    if (resultDown2.length == 1 && result2.length == 1) {
        document.getElementById("total-vote-count2").innerText = (result2[0].balance - (resultDown2[0].balance * .1));
    } else {
        document.getElementById("total-vote-count2").innerText = (result2Total - resultDown2Total);
    };
};

function setVoteCount1() {
    var votecount = document.getElementById("vote-count-input1");
    voteCountValue = votecount.value;
    voteamount1 = parseInt(voteCountValue);
    console.log(voteamount1);
}

function setVoteCount2() {
    var votecount = document.getElementById("vote-count-input2");
    voteCountValue = votecount.value;
    voteamount2 = parseInt(voteCountValue);
    console.log(voteamount2);
}

function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function updatingBalancesText() {
    document.getElementById("vote-token-1-count").innerText = "Updating Balances...";
    document.getElementById("vote-token-2-count").innerText = "Updating Balances...";
    getVoteBalances;
}

//function openModal() {
//document.getElementById("modal"). = "block";
//}

//function closeModal() {
//    document.getElementById("token_modal").style.display = "none";
//}

//function txistory() {
//    var url = "https://bscscan.com/tx/";
//    var tId = rtest.transactionHash;
//    document.getElementById("test3").innerHTML = " <a href='" + url + tId + "'>" + "View Transaction" + "</a> ";
//}

init();
getVoteBalances();
tokenCheck();

//document.getElementById("modal_close").onclick = closeModal;

//This what faciliates the links between the HTML buttons and the javascript functions, uncomment or add/remove as needed when you add new cards in the HTML
document.getElementById("lg").onclick = logOut;
document.getElementById("login_button").onclick = login;
document.getElementById("login_button_wc").onclick = loginWC;
document.getElementById("vote_token_1_button").onclick = voteOne;
document.getElementById("vote_token_2_button").onclick = voteTwo;
document.getElementById("vote_token_1_down_button").onclick = voteOneDown;
document.getElementById("vote_token_2_down_button").onclick = voteTwoDown;
document.getElementById("vote-count-input1").oninput = setVoteCount1;
document.getElementById("vote-count-input2").oninput = setVoteCount2;