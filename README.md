

                                              HOW TO SETUP VIDEOWIKI

 step 1: setup project on local machine or this project is hosted on aws ie videowiki.pt so you can skip step1 or step2

     1. using git first clone the repository 
     2. run this command npm install
     3. npm run serve
     4. requirements : vue-cli, node , npm

 step2:

 in browser run this " localhost:8000 "

  step3 : create video

     1.click on create video on homepage and now you can see our video editor from where you can make video
     2.use any script and create scene after we can choose or upload video for every scene
     3.now we can add text or audio on video and after all this our video is ready for preview 

step4:

This project using apis that is implemented in django and hosted on aws at domain dapi.videowiki.pt

   step4:publish video

     1. Browser supporting ethereum wallet like Brave or Chrome with Metamask extension.
     2. Point metamask to rinkeybi test network.
     3. We will be using two different accounts Account1 and Account2 to test the publisher and buyer flow respectively. Have sufficient test ether in both the                    accounts with minimum 10OCEAN in buyer account.
     4. There will be total 5 transactions to be signed as listed later

          Transactions to signing while publishing:
              1. Create a datatoken
              2. Create the asset
              3. Publish asset
              4. Mint 100 datatokens
              5. Create a FixedRateExchange
              6. Alllow videowiki to exchange your crypto

5. Congratulations your content is now published

        Note : For the moment a fixed exchange is created with 1 datatoken costing 10OCEAN. This will be further upgraded to facilitate staking and other associated features

    step 5: Buying :

        1. Connect your wallet. Point to rinkeybi and make sure it have some test eth and min 10OCEAN
        2. Choose the content of your choice.
        3. Click on fork button.
        4. Metamask will prompt asking to sign the transaction. Two such transactions is needed to be signed.
        5. Once signed, the content will be dowmloaded to your device.

