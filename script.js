const subtitleText = ["Blockchain Developer", "Backend Developer"];
let subtitleIndex = 0;
let charIndex = 0;
const subtitleElement = document.getElementById("dynamic-subtitle");


const typingSpeed = 100; 
const deletingSpeed = 50; 
const pauseTime = 1500; 

function typeAndDelete() {
  if (charIndex < subtitleText[subtitleIndex].length) {
    // Typing phase
    subtitleElement.textContent += subtitleText[subtitleIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeAndDelete, typingSpeed);
  } else {
    // Pausing before start deleting
    setTimeout(deleteText, pauseTime);
  }
}

function deleteText() {
  if (charIndex > 0) {
    // Deleting phase
    subtitleElement.textContent = subtitleElement.textContent.slice(0, -1);
    charIndex--;
    setTimeout(deleteText, deletingSpeed);
  } else {
    // Move to the next word
    subtitleIndex = (subtitleIndex + 1) % subtitleText.length; // Loop through subtitles
    setTimeout(typeAndDelete, typingSpeed);
  }
}

// Start the typing effect
typeAndDelete();
 // Switch subtitle every 3 seconds

// Fetch Solana blockchain data every 60 seconds
async function fetchSolanaData() {
  try {
    const response = await fetch('https://api.mainnet-beta.solana.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "jsonrpc": "2.0",
        "id": 1,
        "method": "getRecentBlockhash"
      })
    });

      const data = await response.json();
      console.log(data)
    displayBlockchainData(data);
  } catch (error) {
    console.error("Error fetching Solana data:", error);
    document.getElementById("blockchain-data").textContent = "Unable to retrieve blockchain data.";
  }
}

function displayBlockchainData(data) {
  const blockHash = data.result.value.blockhash;
  const feeCalculator = data.result.value.feeCalculator.lamportsPerSignature;

  document.getElementById("blockchain-data").innerHTML = `
    <p><strong>Block Hash:</strong> ${blockHash}</p>
    <p><strong>Lamports per Signature:</strong> ${feeCalculator}</p>
  `;
}


fetchSolanaData();
setInterval(fetchSolanaData, 60000);


const body = document.body,
scrollWrap = document.getElementsByClassName("portfolio-main")[0],
height = scrollWrap.getBoundingClientRect().height - 1,
speed = 0.1;
var offset = 0;
body.style.height = Math.floor(height) + "px";
function smoothScroll() {
    offset += (window.scrollY - offset) * speed;
    var scroll = "translateY(-" + offset + "px) translateZ(0)";
    scrollWrap.style.transform = scroll;
    callScroll = requestAnimationFrame(smoothScroll);
}

smoothScroll();
