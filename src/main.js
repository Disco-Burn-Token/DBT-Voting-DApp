//import * as helper from './w3Helper.js';

const serverUrl = "https://n94w6dpcju5j.usemoralis.com:2053/server"; //Server url from moralis.io
const appId = "9fEOftbkmcmrFbKqFwEHfOCfsWBxz3z3efr1vcPM"; // Application id from moralis.io

//This is being used to hold the Web3API namespace
let token_obj;

//keeps track of if a user is logged in.
let logged_in;

//Tracks if user has a vote token
var has_token = false;

//Auto - Refreshes wallet balances every 45 seconds
var intervalId = window.setInterval(function() {
    getVoteBalances();
}, 45000);

//Called when site is loading.
async function init() {
    await Moralis.start({ serverUrl, appId });
    await Moralis.enableWeb3();


    token_obj = await Moralis.Web3API.token;
    currentUser = await Moralis.User.current();
    global.user_profile.entity = currentUser;
    getVoteBalances();
    disableButtons();
    //If User is logged in
    if (currentUser) {
        logged_in = true;
        enableButtons();
        document.getElementById("login_button").innerText = "Logout";
        tokenCheck();
        setHelperData();
        console.log(global.user_profile.born);
    }

    //If user is not logged in
    else {
        logged_in = false;
        disableButtons();
        document.getElementById("login_button").innerText = "Sign in with MetaMask";
    }
}

async function setHelperData() {
    global.user_profile.born = JSON.stringify(currentUser.createdAt);
    const options = { chain: 'bsc' }
    global.user_profile.balances = await Moralis.Web3API.account.getTokenBalances(options);
    global.user_profile.native_bal = await Moralis.Web3API.account.getNativeBalance(options);
}

function enableButtons() {
    document.getElementById("vote_token_1_button").disabled = false;
    document.getElementById("vote_token_2_button").disabled = false;
    document.getElementById("vote_token_3_button").disabled = false;
    document.getElementById("vote_token_4_button").disabled = false;
    document.getElementById("vote_token_5_button").disabled = false;
    document.getElementById("vote_token_1_button").removeAttribute("title");
    document.getElementById("vote_token_2_button").removeAttribute("title");
    document.getElementById("vote_token_3_button").removeAttribute("title");
    document.getElementById("vote_token_4_button").removeAttribute("title");
    document.getElementById("vote_token_5_button").removeAttribute("title");
}

function disableButtons() {
    document.getElementById("vote_token_1_button").disabled = true;
    document.getElementById("vote_token_2_button").disabled = true;
    document.getElementById("vote_token_3_button").disabled = true;
    document.getElementById("vote_token_4_button").disabled = true;
    document.getElementById("vote_token_5_button").disabled = true;
}

//JS for VOTE button ONE functionality
$(function() {
    $("#vote_token_1_button").click(function() {
        $("#vote_token_1_button").addClass("onclic", 250, validate);
    });

    function validate() {
        setTimeout(function() {
            $("#vote_token_1_button").removeClass("onclic");
            $("#vote_token_1_button").addClass("validate", 450, callback);
        }, 2250);
    }

    function callback() {
        setTimeout(function() {
            $("#vote_token_1_button").removeClass("validate");
        }, 1250);
    }
});

//JS for VOTE button TWO functionality
$(function() {
    $("#vote_token_2_button").click(function() {
        $("#vote_token_2_button").addClass("onclic", 250, validate);
    });

    function validate() {
        setTimeout(function() {
            $("#vote_token_2_button").removeClass("onclic");
            $("#vote_token_2_button").addClass("validate", 450, callback);
        }, 2250);
    }

    function callback() {
        setTimeout(function() {
            $("#vote_token_2_button").removeClass("validate");
        }, 1250);
    }
});

//JS for VOTE button THREE functionality
$(function() {
    $("#vote_token_3_button").click(function() {
        $("#vote_token_3_button").addClass("onclic", 250, validate);
    });

    function validate() {
        setTimeout(function() {
            $("#vote_token_3_button").removeClass("onclic");
            $("#vote_token_3_button").addClass("validate", 450, callback);
        }, 2250);
    }

    function callback() {
        setTimeout(function() {
            $("#vote_token_3_button").removeClass("validate");
        }, 1250);
    }
});

//JS for VOTE button FOUR functionality
$(function() {
    $("#vote_token_4_button").click(function() {
        $("#vote_token_4_button").addClass("onclic", 250, validate);
    });

    function validate() {
        setTimeout(function() {
            $("#vote_token_4_button").removeClass("onclic");
            $("#vote_token_4_button").addClass("validate", 450, callback);
        }, 2250);
    }

    function callback() {
        setTimeout(function() {
            $("#vote_token_4_button").removeClass("validate");
        }, 1250);
    }
});

//JS for VOTE button FIVE functionality
$(function() {
    $("#vote_token_5_button").click(function() {
        $("#vote_token_5_button").addClass("onclic", 250, validate);
    });

    function validate() {
        setTimeout(function() {
            $("#vote_token_5_button").removeClass("onclic");
            $("#vote_token_5_button").addClass("validate", 450, callback);
        }, 2250);
    }

    function callback() {
        setTimeout(function() {
            $("#vote_token_5_button").removeClass("validate");
        }, 1250);
    }
});



async function login() {
    try {
        currentUser = Moralis.User.current();
        if (!currentUser) {
            document.getElementById("login_button").innerText = "Authenticating...";
            currentUser = await Moralis.authenticate();
            enableButtons();
            tokenCheck();
            setHelperData();
        } else {
            logOut();
        }
        document.getElementById("login_button").innerText = "Logout";
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

    logged_in = false;
}

async function loginWC() {
    try {
        currentUser = Moralis.User.current();
        if (!currentUser) {
            document.getElementById("login_button_wc").innerText = "Authenticating...";
            currentUser = await Moralis.authenticate({ provider: "walletconnect", chainId: 56 });
            enableButtons();
            tokenCheck();
            setHelperData();
        } else {
            logOut();
        }
        document.getElementById("login_button_wc").innerText = "Logout";
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

    logged_in = false;
}

async function tokenCheck() {
    let currentBalances = await Moralis.Web3API.account.getTokenBalances({ chain: 'bsc' });
    vote_token = currentBalances.filter(function(v) {
        return v.token_address == 0xa38975Ccc0e8dc7599bfa89BcFdE870eEB50D607;
    });
    if (vote_token.length != 0) {
        has_token = true;
        document.getElementById("message").style.display = "none";
    } else if (vote_token.length == 0) {
        has_token = false;
        document.getElementById("message").style.display = "block";
        document.getElementById("message").innerText = "Logged in but no DvT in Wallet";
        disableButtons();
    }
}

async function voteOne() {
    const tx = await Moralis.transfer({
        type: "erc20",
        amount: Moralis.Units.Token("1", "9"),
        receiver: "0xecbA00776aA154B3c05486badB0AE2d08B865d04",
        contractAddress: "0xa38975Ccc0e8dc7599bfa89BcFdE870eEB50D607",
        awaitReceipt: false
    });
    tx.on("error", (error) => {
        document.getElementById("message").style.display = "block";
        document.getElementById("message").innerText = "Vote Failed";
        setTimeout(() => { document.getElementById("message").style.display = "none"; }, 10000);
    });
    tx.on("receipt", (receipt) => {
        document.getElementById("message").style.display = "block";
        document.getElementById("message").style.color = "green";
        document.getElementById("message").innerText = "Vote Successful!";
        disableButtons();
        setTimeout(() => { getVoteBalances(); }, 10000);
        setTimeout(() => { getVoteBalances(); }, 5000);
    });
}

async function voteTwo() {
    const tx = await Moralis.transfer({
        type: "erc20",
        amount: Moralis.Units.Token("1", "9"),
        receiver: "0x26F4C1C79dA2db3E298053B1416089783A796c70",
        contractAddress: "0xa38975Ccc0e8dc7599bfa89BcFdE870eEB50D607",
        awaitReceipt: false
    });
    tx.on("error", (error) => {
        document.getElementById("message").style.display = "block";
        document.getElementById("message").innerText = "Vote Failed";
        setTimeout(() => { document.getElementById("message").style.display = "none"; }, 10000);
    });
    tx.on("receipt", (receipt) => {
        document.getElementById("message").style.display = "block";
        document.getElementById("message").style.color = "green";
        document.getElementById("message").innerText = "Vote Successful!";
        disableButtons();
        setTimeout(() => { getVoteBalances(); }, 10000);
        setTimeout(() => { getVoteBalances(); }, 5000);
    });
}

async function voteThree() {
    const tx = await Moralis.transfer({
        type: "erc20",
        amount: Moralis.Units.Token("1", "9"),
        receiver: "0xF0858a63193f3958D42AC6d2fD21B84CEC5291C8",
        contractAddress: "0xa38975Ccc0e8dc7599bfa89BcFdE870eEB50D607",
        awaitReceipt: false
    });
    tx.on("error", (error) => {
        document.getElementById("message").style.display = "block";
        document.getElementById("message").innerText = "Vote Failed";
        setTimeout(() => { document.getElementById("message").style.display = "none"; }, 10000);
    });
    tx.on("receipt", (receipt) => {
        document.getElementById("message").style.display = "block";
        document.getElementById("message").style.color = "green";
        document.getElementById("message").innerText = "Vote Successful!";
        disableButtons();
        setTimeout(() => { getVoteBalances(); }, 10000);
        setTimeout(() => { getVoteBalances(); }, 5000);
    });
}

async function voteFour() {
    const tx = await Moralis.transfer({
        type: "erc20",
        amount: Moralis.Units.Token("1", "9"),
        receiver: "0xb6dAEc6f33C26fC6Da7b42cd935475dF5a04f1c3",
        contractAddress: "0xa38975Ccc0e8dc7599bfa89BcFdE870eEB50D607",
        awaitReceipt: false
    });
    tx.on("error", (error) => {
        document.getElementById("message").style.display = "block";
        document.getElementById("message").innerText = "Vote Failed";
        setTimeout(() => { document.getElementById("message").style.display = "none"; }, 10000);
    });
    tx.on("receipt", (receipt) => {
        document.getElementById("message").style.display = "block";
        document.getElementById("message").style.color = "green";
        document.getElementById("message").innerText = "Vote Successful!";
        disableButtons();
        setTimeout(() => { getVoteBalances(); }, 10000);
        setTimeout(() => { getVoteBalances(); }, 5000);
    });
}

async function voteFive() {
    const tx = await Moralis.transfer({
        type: "erc20",
        amount: Moralis.Units.Token("1", "9"),
        receiver: "0xD14c8ffBe2e04e12919a0cc05532F563944d076b",
        contractAddress: "0xa38975Ccc0e8dc7599bfa89BcFdE870eEB50D607",
        awaitReceipt: false
    });
    tx.on("error", (error) => {
        document.getElementById("message").style.display = "block";
        document.getElementById("message").innerText = "Vote Failed";
        setTimeout(() => { document.getElementById("message").style.display = "none"; }, 10000);
    });
    tx.on("receipt", (receipt) => {
        document.getElementById("message").style.display = "block";
        document.getElementById("message").style.color = "green";
        document.getElementById("message").innerText = "Vote Successful!";
        disableButtons();
        setTimeout(() => { getVoteBalances(); }, 10000);
        setTimeout(() => { getVoteBalances(); }, 5000);
    });
}

async function getVoteBalances() {

    let balances1 = await Moralis.Web3API.account.getTokenBalances({ chain: 'bsc', address: "0xecbA00776aA154B3c05486badB0AE2d08B865d04" });
    result1 = balances1.filter(function(e) {
        return e.token_address == 0xa38975Ccc0e8dc7599bfa89BcFdE870eEB50D607;
    });

    let balances2 = await Moralis.Web3API.account.getTokenBalances({ chain: 'bsc', address: "0x26F4C1C79dA2db3E298053B1416089783A796c70" });
    result2 = balances2.filter(function(f) {
        return f.token_address == 0xa38975Ccc0e8dc7599bfa89BcFdE870eEB50D607;
    });

    let balances3 = await Moralis.Web3API.account.getTokenBalances({ chain: 'bsc', address: "0xF0858a63193f3958D42AC6d2fD21B84CEC5291C8" });
    result3 = balances3.filter(function(g) {
        return g.token_address == 0xa38975Ccc0e8dc7599bfa89BcFdE870eEB50D607;
    });

    let balances4 = await Moralis.Web3API.account.getTokenBalances({ chain: 'bsc', address: "0xb6dAEc6f33C26fC6Da7b42cd935475dF5a04f1c3" });
    result4 = balances4.filter(function(h) {
        return h.token_address == 0xa38975Ccc0e8dc7599bfa89BcFdE870eEB50D607;
    });

    let balances5 = await Moralis.Web3API.account.getTokenBalances({ chain: 'bsc', address: "0xD14c8ffBe2e04e12919a0cc05532F563944d076b" });
    result5 = balances5.filter(function(i) {
        return i.token_address == 0xa38975Ccc0e8dc7599bfa89BcFdE870eEB50D607;
    });
    if (result1.length == 1) {
        document.getElementById("vote-token-1-count").innerText = (result1[0].balance / 1000000000);
    };
    if (result2.length == 1) {
        document.getElementById("vote-token-2-count").innerText = (result2[0].balance / 1000000000);
    };
    if (result3.length == 1) {
        document.getElementById("vote-token-3-count").innerText = (result3[0].balance / 1000000000);
    };
    if (result4.length == 1) {
        document.getElementById("vote-token-4-count").innerText = (result4[0].balance / 1000000000);
    };
    if (result5.length == 1) {
        document.getElementById("vote-token-5-count").innerText = (result5[0].balance / 1000000000);
    };
};

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


//document.getElementById("modal_close").onclick = closeModal;
document.getElementById("lg").onclick = logOut;
document.getElementById("login_button").onclick = login;
document.getElementById("login_button_wc").onclick = loginWC;
document.getElementById("vote_token_1_button").onclick = voteOne;
document.getElementById("vote_token_2_button").onclick = voteTwo;
document.getElementById("vote_token_3_button").onclick = voteThree;
document.getElementById("vote_token_4_button").onclick = voteFour;
document.getElementById("vote_token_5_button").onclick = voteFive;