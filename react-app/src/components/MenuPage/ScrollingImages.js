import React from "react";

function ScrollingImages() {
  const images = [
    "https://cdn.discordapp.com/attachments/885032629299212308/1211750974192877588/a0000370_main.png?ex=65ef5609&is=65dce109&hm=4d56e219bda63af2fbda43cd71b4a9ecbdd745b41e33be009cdbcbbc02fb3903&",
    "https://cdn.discordapp.com/attachments/885032629299212308/1211556461340135455/restaurant-6451.png?ex=65eea0e2&is=65dc2be2&hm=98fd6b865f0fec00d9b3570bc5b18b22a0abd3acef5a28691ba034e346a1aaa0&",
    "https://cdn.discordapp.com/attachments/885032629299212308/1211777024491003984/8195430355440970779.png?ex=65ef6e4c&is=65dcf94c&hm=1810007c7929629bf461b0d6edf6ec45c49a29540ec1183bee38586614a963b9&",
    "https://cdn.discordapp.com/attachments/885032629299212308/1211776886951247882/jw-5d1485e80dd875.png?ex=65ef6e2b&is=65dcf92b&hm=f8ee36da29f751c93f2dccd1eebfc8e2acbadaf909d6f15824ea022b8dcb777e&",
    "https://cdn.discordapp.com/attachments/885032629299212308/1211749536880525362/e603c577-334e-4ad2-8381-68201c86ab9b.png?ex=65ef54b2&is=65dcdfb2&hm=87923e1fd9b48b29fcd3cdeb185869af2af900ab7638f6e914d01258cb9cb743&",
    "https://cdn.discordapp.com/attachments/885032629299212308/1211776705736212521/2017_02_24_22239_1487924367.png?ex=65ef6e00&is=65dcf900&hm=35e7a5de8cfbb55282213ecc393a4d10fdb3a120974d812effe4cf33466cdd9f&",
    "https://cdn.discordapp.com/attachments/885032629299212308/1211556825863028787/97159fad-a505-4b38-b337-1b1ec14b06c5.png?ex=65eea138&is=65dc2c38&hm=6de26adb459fdb4627977272a71db31f7c0e3080e3f1947642cbc54893741ec8&",
    "https://cdn.discordapp.com/attachments/885032629299212308/1211776649289269288/images.png?ex=65ef6df2&is=65dcf8f2&hm=67f234b5d63f30f0e21e943802b66771e076a0ebc38707d4208f151eeab17f1f&",
    "https://cdn.discordapp.com/attachments/885032629299212308/1211557573896052796/rasushi-cocktails.png?ex=65eea1eb&is=65dc2ceb&hm=fede5b11207b5690fce0b6228ca62255f3dde7a2cd66fbd714301edf3c9c30c3&",
    "https://cdn.discordapp.com/attachments/885032629299212308/1211557163911086100/hibachi-restaurants-chef-1.png?ex=65eea189&is=65dc2c89&hm=34fd331aee891749acce7b8ccab44a8732e2f70f8d8580858a56ca2544015504&",
    "https://cdn.discordapp.com/attachments/885032629299212308/1211556699752628275/Kakitamajiru-Egg-Drop-Soup-1398-I.png?ex=65eea11a&is=65dc2c1a&hm=79f5002a4ebafed735b7ab553a09dac02409fc70fd1c5a53c584faae1dbd9183&",
    "https://cdn.discordapp.com/attachments/885032629299212308/1211556396445864006/2f5e3418-dabb-4591-8186-16e3d7272aa1.png?ex=65eea0d2&is=65dc2bd2&hm=d7c73f5ca69f8a7b356fabb1202164a170a9d57f9c704e46a2588406f65f052f&",
    "https://cdn.discordapp.com/attachments/885032629299212308/1211557649628274718/38232178-1629-4365-a578-38c7ac678828.png?ex=65eea1fd&is=65dc2cfd&hm=b1ff6efa2b29610c14cbfd482e2fde41fde5d054ff5f9d2ed56de9c3349171d1&",
    "https://cdn.discordapp.com/attachments/885032629299212308/1211749401207509092/blog-featured.png?ex=65ef5492&is=65dcdf92&hm=9d9d599ae6e25206d43aaa62dea2ca5531f99e4a96e4cbe39b307dc162539603&",
  ];

  return (
    <div className="image-scroller hidden sm:block">
      <div>
        {images.concat(images).map((src, index) => (
          <img
            key={index}
            src={src}
            alt=""
            className="w-30 h-20 flex-shrink-0 object-cover"
          />
        ))}
      </div>
    </div>
  );
}

export default ScrollingImages;
