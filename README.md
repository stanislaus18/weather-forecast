# WeatherForecast

## About The Project

<img width="1117" alt="image" src="https://github.com/stanislaus18/weather-forecast/assets/17940960/a9a16b47-baaa-42b6-955c-7b36f5f66cef">

# Built With
1. <a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>
2. <a href="https://angular.io/" rel="nofollow"><img src="https://camo.githubusercontent.com/29026b68c52288230bf32bc2268e47e5c3b81dba23106fb062fcc0541f8e9529/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f416e67756c61722d4444303033313f7374796c653d666f722d7468652d6261646765266c6f676f3d616e67756c6172266c6f676f436f6c6f723d7768697465" alt="Angular" data-canonical-src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&amp;logo=angular&amp;logoColor=white" style="max-width: 100%;"></a>
3. <a href="https://getbootstrap.com" rel="nofollow"><img src="https://camo.githubusercontent.com/b13ed67c809178963ce9d538175b02649800772be1ce0cb02da5879e5614e236/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f426f6f7473747261702d3536334437433f7374796c653d666f722d7468652d6261646765266c6f676f3d626f6f747374726170266c6f676f436f6c6f723d7768697465" alt="Bootstrap" data-canonical-src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&amp;logo=bootstrap&amp;logoColor=white" style="max-width: 100%;"></a>


The web application is built keeping in mind robust, scalable, and maintainable code.
I am using Microfrontends in monorepo (Each could be built and run successfully) 

## Getting Started
This is an example of how you may give instructions on setting up your project locally. To get a local copy up and running follow these simple example steps.

# Prerequisites
1. Node 16 or higher
2. Angular 16 
3. yarn `npm install --global yarn` version 1.22.19
4. Nx CLI ( could also be install with package.json of application for local)
5. openweathermap API Key (included in project)  
6. and ofcourse editor to view the code (Recommended vscode) 

# Installation
1. `git clone https://github.com/stanislaus18/weather-forecast.git`
2. `yarn install`
3. `yarn start`

# To run microfrontends instead of whole application
1. `yarn start:weather`
2. `yarn start:forecast`
3. `yarn start:air-pollution`

# To test the application 
  `yarn test:ci`

# Others
  Application is using polling mechanism to pull data from api for every 5 seconds, to give you latest data
  
  Forecast is restricted to 5 days only
  
  you can select any of USA city for weather conditions through the drop down they all reactive changes 
  
  Redux store holds most of the data (if you have redux tool you could see the infomation there store
 <img width="669" alt="image" src="https://github.com/stanislaus18/weather-forecast/assets/17940960/b18049e5-c20f-4e5a-8b85-f9a024644752">
  

 # Entire application
  1. ![image](https://github.com/stanislaus18/weather-forecast/assets/17940960/c0e42428-8f0b-408b-9eac-28b72e5852fd)
  2. ![image](https://github.com/stanislaus18/weather-forecast/assets/17940960/c772ff80-24ee-4110-aec9-bd1edf1190de)
  3. ![image](https://github.com/stanislaus18/weather-forecast/assets/17940960/111a4afe-d8ee-48bb-9e50-ac06b86d4268)
  4. ![image](https://github.com/stanislaus18/weather-forecast/assets/17940960/c34ffc1f-96d9-4d86-907b-0c90b42a6e40)



# License
Distributed under the MIT License. See LICENSE.txt for more information.

Contact
Joseph Stanislaus Dsouza - stanislaus18@gmail.com

Project Link: [https://github.com/stanislaus18/weather-forecast.git](https://github.com/stanislaus18/weather-forecast.git)



