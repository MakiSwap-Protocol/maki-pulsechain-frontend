/** That's a prize */

// eslint-disable-next-line no-var
var rootElement = document.getElementById('root');

function elementOnChangeChildList(element, callback){
  const config = {
    attributes: true,
    childList: true,
    subtree: true
  };
  
  const observer = new MutationObserver(callback);
  observer.observe(element, config);
  return observer;
}

function rootOnChangeChildList(callback) {
  return elementOnChangeChildList(rootElement, callback)
}

function changeMakiLogoLink(_isDark){
  const nav = document.querySelector('nav div:first-child');
  const logoLink = nav.lastChild;
  const newImage = document.createElement('img');
  newImage.src = _isDark ? '/images/logo/logo_dark.svg' : '/images/logo/logo_ligth.svg';
  newImage.alt = 'Maki logo';
  logoLink.replaceChild(newImage, logoLink.lastChild);
}

function getBlockScanLinkElement() {
  return rootElement.querySelector('a[rel="noreferrer noopener"]');
}

function changeBlockScanLinkAttr(label, blockScanUrl) {
  const blockScanLinkElement = getBlockScanLinkElement();
  if(!blockScanLinkElement) return undefined;
  blockScanLinkElement.innerHTML = label;
  const wallet = blockScanLinkElement
    .parentElement
    .parentElement
    .firstChild
    .innerText;
  blockScanLinkElement.setAttribute('href', blockScanUrl + wallet);
  return blockScanLinkElement;
}

function changeBlockScanLink(){
  function callback(entries, observer){
    observer.disconnect()
    changeBlockScanLinkAttr('View on PulsechainScan', 'https://scan.v4.testnet.pulsechain.com/address/')
  }
  rootOnChangeChildList(callback);
}

function isDark() {
  const btns = document.querySelectorAll('#root > div > div > div > div > div:nth-child(2) > div:last-child > button svg');
  return btns[0].attributes.color.nodeValue == 'textDisabled' && btns[1].attributes.color.nodeValue != 'textDisabled';
}

function changeConnectButton(nav, _isDark) {
  const connectButton = nav.firstChild.firstChild;
  connectButton.classList.remove('connectButton');
  connectButton.classList.remove('conBtnLight');

  connectButton.classList.add('connectButton');

  if (!_isDark) {
    connectButton.classList.add('conBtnLight');
  }

  connectButton.addEventListener('click', changeBlockScanLink);
}

function main(){
  document.addEventListener('DOMContentLoaded', (event) => {
    // ADD BLOCKCHAIN BUTTONS
    const nav = document.querySelector('nav div:last-child');
    nav.style.display="flex";
    nav.style.flexDirection="row-reverse";
    nav.append(
      document.createRange().createContextualFragment('<div id="networkDesktop"><a href="http://app.makiswap.com" style="margin-right: 5px;"><img src="/images/ht.svg" style="/* max-height: 1px; */width: 31px;"></a><a href="https://ftm.makiswap.com/" style="margin-right: 24px;"><img src="/images/ftm.svg" style="width: 30px;"></a></div>')
    );

    const navMobile = document.querySelector('#root > div > div:first-child > div:last-child > div:first-child');  
    navMobile.append(
      document.createRange().createContextualFragment('<div id="networkMobile"><a href="http://app.makiswap.com" style="display: flex;align-items: center;">HECO<img src="/images/coins/ht.svg" style="width: 31px;margin-left: 5px;"></a><a href="https://ftm.makiswap.com/" style="display: flex;align-items: center;">PLS<img src="/images/coins/PLS.png" style="width: 30px;margin-left: 5px;"></a></div>')
    );

    changeConnectButton(nav, isDark());

    changeMakiLogoLink(isDark())

    // REMOVE PRICE LINK
    // document.querySelector('#root > div > div > div > div > div:last-child  > div > a')?.href = "#";
    
    // UPDATE CONNECET BUTTON
    // const dark = isDark();
    // const nav = document.querySelector('nav div:first-child button');

    // changeMakiLogoLink('/logo.svg')

    elementOnChangeChildList(
      document.querySelector('#root > div > div > div > div > div:nth-child(2) > div:last-child > button'),
      (entries, observer) => {
        const _isDark = isDark();
        changeConnectButton(nav, _isDark);
        changeMakiLogoLink(_isDark)
      }
    )
  
  });
}

main();