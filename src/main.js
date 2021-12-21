//import * as helper from './w3Helper.js';

const serverUrl = "https://klpxwezyuiua.usemoralis.com:2053/server"; //Server url from moralis.io
const appId = "SJlvpL4zKheiaYlFnUpSL5ozOZsq7D7Q45nbwckX"; // Application id from moralis.io

//This is being used to hold the Web3API namespace
let token_obj;

//keeps track of if a user is logged in.
let logged_in;

//Called when site is loading.
async function init() {
    await Moralis.start({ serverUrl, appId });
    await Moralis.enableWeb3();

    token_obj = await Moralis.Web3API.token;
    currentUser = await Moralis.User.current();
    global.user_profile.entity = currentUser;
    //document.getElementById("slippage").value = slippage;
    //If User is logged in
    if (currentUser) {
        logged_in = true;
        document.getElementById("vote_token_1_button").disabled = false;
        document.getElementById("vote_token_2_button").disabled = false;
        document.getElementById("vote_token_3_button").disabled = false;
        document.getElementById("vote_token_4_button").disabled = false;
        document.getElementById("vote_token_5_button").disabled = false;
        document.getElementById("login_button").innerText = "Logout";
        setHelperData();
        console.log(global.user_profile.born);
    }

    //If user is not logged in
    else {
        logged_in = false;
        document.getElementById("vote_token_1_button").disabled = true;
        document.getElementById("vote_token_2_button").disabled = true;
        document.getElementById("vote_token_3_button").disabled = true;
        document.getElementById("vote_token_4_button").disabled = true;
        document.getElementById("vote_token_5_button").disabled = true;
        document.getElementById("login_button").innerText = "Sign in with Metamask";
    }
}

async function setHelperData() {
    global.user_profile.born = JSON.stringify(currentUser.createdAt);
    const options = { chain: 'bsc' }
    global.user_profile.balances = await Moralis.Web3API.account.getTokenBalances(options);
    global.user_profile.native_bal = await Moralis.Web3API.account.getNativeBalance(options);
}

//JS for VOTE button ONE functionality
$(function() {
    $( "#vote_token_1_button" ).click(function() {
      $( "#vote_token_1_button" ).addClass( "onclic", 250, validate);
    });
  
    function validate() {
      setTimeout(function() {
        $( "#vote_token_1_button" ).removeClass( "onclic" );
        $( "#vote_token_1_button" ).addClass( "validate", 450, callback );
      }, 2250 );
    }
      function callback() {
        setTimeout(function() {
          $( "#vote_token_1_button" ).removeClass( "validate" );
        }, 1250 );
      }
    });

//JS for VOTE button TWO functionality
$(function() {
    $( "#vote_token_2_button" ).click(function() {
      $( "#vote_token_2_button" ).addClass( "onclic", 250, validate);
    });
  
    function validate() {
      setTimeout(function() {
        $( "#vote_token_2_button" ).removeClass( "onclic" );
        $( "#vote_token_2_button" ).addClass( "validate", 450, callback );
      }, 2250 );
    }
      function callback() {
        setTimeout(function() {
          $( "#vote_token_2_button" ).removeClass( "validate" );
        }, 1250 );
      }
    });

    //JS for VOTE button THREE functionality
$(function() {
    $( "#vote_token_3_button" ).click(function() {
      $( "#vote_token_3_button" ).addClass( "onclic", 250, validate);
    });
  
    function validate() {
      setTimeout(function() {
        $( "#vote_token_3_button" ).removeClass( "onclic" );
        $( "#vote_token_3_button" ).addClass( "validate", 450, callback );
      }, 2250 );
    }
      function callback() {
        setTimeout(function() {
          $( "#vote_token_3_button" ).removeClass( "validate" );
        }, 1250 );
      }
    });

    //JS for VOTE button FOUR functionality
$(function() {
    $( "#vote_token_4_button" ).click(function() {
      $( "#vote_token_4_button" ).addClass( "onclic", 250, validate);
    });
  
    function validate() {
      setTimeout(function() {
        $( "#vote_token_4_button" ).removeClass( "onclic" );
        $( "#vote_token_4_button" ).addClass( "validate", 450, callback );
      }, 2250 );
    }
      function callback() {
        setTimeout(function() {
          $( "#vote_token_4_button" ).removeClass( "validate" );
        }, 1250 );
      }
    });

    //JS for VOTE button FIVE functionality
$(function() {
    $( "#vote_token_5_button" ).click(function() {
      $( "#vote_token_5_button" ).addClass( "onclic", 250, validate);
    });
  
    function validate() {
      setTimeout(function() {
        $( "#vote_token_5_button" ).removeClass( "onclic" );
        $( "#vote_token_5_button" ).addClass( "validate", 450, callback );
      }, 2250 );
    }
      function callback() {
        setTimeout(function() {
          $( "#vote_token_5_button" ).removeClass( "validate" );
        }, 1250 );
      }
    });

async function login() {
    try {
        currentUser = Moralis.User.current();
        if (!currentUser) {
            document.getElementById("login_button").innerText = "Authenticating...";
            currentUser = await Moralis.authenticate();
            document.getElementById("vote_token_1_button").disabled = false;
            document.getElementById("vote_token_2_button").disabled = false;
            document.getElementById("vote_token_3_button").disabled = false;
            document.getElementById("vote_token_4_button").disabled = false;
            document.getElementById("vote_token_5_button").disabled = false;
            setHelperData();
        } else {
            logOut();
        }
        document.getElementById("vote_token_1_button").disabled = false;
        document.getElementById("vote_token_2_button").disabled = false;
        document.getElementById("vote_token_3_button").disabled = false;
        document.getElementById("vote_token_4_button").disabled = false;
        document.getElementById("vote_token_5_button").disabled = false;
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
    document.getElementById("vote_token_1_button").disabled = true;
    document.getElementById("vote_token_2_button").disabled = true;
    document.getElementById("vote_token_3_button").disabled = true;
    document.getElementById("vote_token_4_button").disabled = true;
    document.getElementById("vote_token_5_button").disabled = true;

    logged_in = false;
}

async function loginWC() {
    document.getElementById("login_button_wc").innerText = "Authenticating...";
    const user = await Moralis.authenticate({ provider: "walletconnect", chainId: 56 });
    document.getElementById("vote_token_1_button").disabled = false;
    document.getElementById("vote_token_2_button").disabled = false;
    document.getElementById("vote_token_3_button").disabled = false;
    document.getElementById("vote_token_4_button").disabled = false;
    document.getElementById("vote_token_5_button").disabled = false;
}
try {

} catch (error) {
    if (error.message == "User closed modal") {
        alert("Login cancelled")
        document.getElementById("login_button_wc").innerText = "Sign in with WalletConnect";
    }

}

async function logOutWC() {
    currentUser = await Moralis.User.logOut();
    document.getElementById("login_button_wc").innerText = "Sign in with WalletConnect";
    document.getElementById("vote_token_1_button").disabled = true;
    document.getElementById("vote_token_2_button").disabled = true;
    document.getElementById("vote_token_3_button").disabled = true;
    document.getElementById("vote_token_4_button").disabled = true;
    document.getElementById("vote_token_5_button").disabled = true;

    logged_in = false;
}

function voteOne() {
    Moralis.transfer({
        type: "erc20",
        amount: Moralis.Units.Token("1", "0"),
        receiver: "0x21aC5A168ecBC07D401875fb8747474d558125eb",
        contractAddress: "0x21aC5A168ecBC07D401875fb8747474d558125eb"
    });
}

function voteTwo() {
    Moralis.transfer({
        type: "erc20",
        amount: Moralis.Units.Token("1", "0"),
        receiver: "0x21aC5A168ecBC07D401875fb8747474d558125eb",
        contractAddress: "0x21aC5A168ecBC07D401875fb8747474d558125eb"
    });
};

function voteThree() {
    Moralis.transfer({
        type: "erc20",
        amount: Moralis.Units.Token("1", "0"),
        receiver: "0x21aC5A168ecBC07D401875fb8747474d558125eb",
        contractAddress: "0x21aC5A168ecBC07D401875fb8747474d558125eb"
    });
}

function voteFour() {
    Moralis.transfer({
        type: "erc20",
        amount: Moralis.Units.Token("1", "0"),
        receiver: "0x21aC5A168ecBC07D401875fb8747474d558125eb",
        contractAddress: "0x21aC5A168ecBC07D401875fb8747474d558125eb"
    });
}

function voteFive() {
    Moralis.transfer({
        type: "erc20",
        amount: Moralis.Units.Token("1", "0"),
        receiver: "0x21aC5A168ecBC07D401875fb8747474d558125eb",
        contractAddress: "0x21aC5A168ecBC07D401875fb8747474d558125eb"
    });
}

//function openModal(side) {
//    currentSelectSide = side;
//    if (side == 'from') {
//        from = true;
//    } else {
//        from = false;
//    }
//    document.getElementById("token_modal").style.display = "block";
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