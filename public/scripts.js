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

function changeMakiLogoLink(imageSource){
  const nav = document.querySelector('nav div:first-child');
  const logoLink = nav.lastChild;
  const newImage = document.createElement('img')
  newImage.src=imageSource;
  newImage.alt = 'Maki logo'
  logoLink.replaceChild(newImage, logoLink.lastChild)
}

function getBlockScanLinkElement() {
  return rootElement.querySelector('a[rel="noreferrer noopener"]');
}

function changeBlockScanLinkAttr(label, blockScanUrl){
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
    changeBlockScanLinkAttr('View on otter.pulsechain', 'https://otter.pulsechain.com/address/')
  }
  rootOnChangeChildList(callback);
}

function main(){
  document.addEventListener('DOMContentLoaded', (event) => {
    // const style = (node, styles) => Object.keys(styles).forEach(key => node.style[key] = styles[key]);

    const desktop = document.createRange().createContextualFragment('<div id="networkDesktop"><a href="http://app.makiswap.com" style="margin-right: 5px;"><img src="/images/ht.svg" style="/* max-height: 1px; */width: 31px;"></a><a href="https://ftm.makiswap.com/" style="margin-right: 24px;"><img src="/images/ftm.svg" style="width: 30px;"></a></div>');
    const mobile  = document.createRange().createContextualFragment('<div id="networkMobile"><a href="http://app.makiswap.com" style="display: flex;align-items: center;">HECO<img src="/images/coins/ht.svg" style="width: 31px;margin-left: 5px;"></a><a href="https://ftm.makiswap.com/" style="display: flex;align-items: center;">PLS<img src="/images/coins/PLS.png" style="width: 30px;margin-left: 5px;"></a></div>');

    document.querySelector('nav div:last-child').style.display="flex";
    document.querySelector('nav div:last-child').style.flexDirection="row-reverse";

    const nav = document.querySelector('nav div:last-child');
    const connectButton = nav.lastChild.firstChild;
    /* style(connectButton, {
      position: 'relative',
      ['border-color']: 'transparent',
      'background': 'transparent'
    }); */
    connectButton.classList.add('connectButton');
    connectButton.addEventListener('click', changeBlockScanLink)
    nav?.append(desktop);
    const divASD = document.querySelector('#root > div > div:first-child > div:last-child > div:first-child'); //   
    divASD.append(mobile);
    changeMakiLogoLink('/logo.svg')
  });
}
main();