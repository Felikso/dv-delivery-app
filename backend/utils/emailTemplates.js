export const MAIL_HEADER = `
<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <link rel="icon" type="image/svg+xml" href="./vd.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{headTitle}</title>

  <style>
    @font-face {
      font-family: Segoe;
    src:url('fonts/Segoe.eot?#') format('eot'),    
        url('fonts/Segoe.wof') format('woff'), 
        url('fonts/Segoe.ttf') format('truetype');  
    }
    .body{font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;}

    .mailBox{background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgb(148, 118, 37) 50%, rgb(0, 0, 0) 100%); padding: 20px; text-align: center; border-top-right-radius: 50px; border-top-left-radius: 50px;}

    .title{color: white; margin: 0; font-size: 1rem;}

    .mailContent{background-color: rgba(228, 198, 99, 0.555); padding: 1rem 3rem; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); border-bottom-right-radius: 50px; border-bottom-left-radius: 50px;}

    .codeBox{text-align: center; margin: 3rem 0;}

    .code{font-size: 32px; font-weight: bold; letter-spacing: 5px; color: rgb(148, 118, 37);}

    .messageBox{display: flex; flex-direction: column; gap: 20px;}

    .messageContent{text-align: center; align-self: flex-start; display: grid; gap: 10px; align-self: center; margin-top: 1rem;}

    .codeExpiried{font-weight: 700;}

    .button{font-weight: bold; background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgb(148, 118, 37) 50%, rgb(0, 0, 0) 100%); text-decoration: none; color: white; padding: 20px; border-radius: 30px;}
    
    .logo{text-align: center; line-height: .9; font-size: 4rem; margin-top: 0px; font-family: Segoe Print;}

    .dontReplay{text-align: center; margin-top: 20px; color: #888; font-size: 0.8em; }

    .itemsBox{font-size: 1rem;font-style: italic; margin: 1.5rem 0;}

    </style>
</head>
<body class="body">
  <div class="mailBox">`


export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <link rel="icon" type="image/svg+xml" href="./vd.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Weryfikacja zamówienia</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgb(148, 118, 37) 50%, rgb(0, 0, 0) 100%); padding: 20px; text-align: center; border-top-right-radius: 50px; border-top-left-radius: 50px;">
    <h1 style="color: white; margin: 0; font-size: 1rem;">Zweryfikuj swoje zamówienie</h1>
  </div>
  <div style="background-color: rgba(228, 198, 99, 0.555); padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);     border-bottom-right-radius: 50px; border-bottom-left-radius: 50px;">
    <p>Cześć,</p>
    <p>Udało Ci się pomyślnie złożyć zamówienie. ;) Potwierdź je wpisując kod z obrazka pod wskazany link:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: rgb(148, 118, 37);">{verificationCode}</span>
    </div>
    <div  style="display: flex; flex-direction: column; gap: 20px;">
    <div style="text-align: center; align-self: flex-start; display: grid; gap: 10px;">
    <a href='https://admin-panel-project-2zrh.onrender.com/zamowienia' style=" font-weight: bold; background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgb(148, 118, 37) 50%, rgb(0, 0, 0) 100%); text-decoration: none;
    color: white;
    padding: 20px;
    border-radius: 30px;">potwierdzam zamówienie</a>
    <p style="font-weight: bold;">Kod za godzinę wygaśnie!</p>
    <p>Pozdrowienia - Ventus Dev</p>
  </div>
  <svg
   width="13.229172mm"
   height="4.4841013mm"
   viewBox="0 0 13.229172 4.4841013"
   version="1.1"
   id="svg1"
   style="
   align-self: end;
   width: 50%;
   height: 100%;"
   inkscape:version="1.3.2 (091e20e, 2023-11-25, custom)"
   sodipodi:docname="logoVentusDev.svg"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <sodipodi:namedview
     id="namedview1"
     pagecolor="#ffffff"
     bordercolor="#000000"
     borderopacity="0.25"
     inkscape:showpageshadow="2"
     inkscape:pageopacity="0.0"
     inkscape:pagecheckerboard="0"
     inkscape:deskcolor="#d1d1d1"
     inkscape:document-units="mm"
     inkscape:zoom="1.3843855"
     inkscape:cx="-57.426199"
     inkscape:cy="79.457635"
     inkscape:window-width="1920"
     inkscape:window-height="991"
     inkscape:window-x="-9"
     inkscape:window-y="-9"
     inkscape:window-maximized="1"
     inkscape:current-layer="layer1" />
  <defs
     id="defs1" />
  <g
     inkscape:label="Warstwa 1"
     inkscape:groupmode="layer"
     id="layer1"
     transform="translate(-25.075817,-113.19513)">
    <path
       id="path1-4"
       style="fill:#000000;stroke-width:0.0123204"
       inkscape:transform-center-y="1.0722344"
       d="m 28.115202,113.19513 c 0.09251,5.5e-4 -2.842584,0.46602 -3.028697,0.44599 0.113327,0.11482 1.008732,2.30522 0.963118,2.24358 -0.04563,-0.0617 1.948668,1.65239 2.018696,1.78553 0.07285,-0.1323 2.102732,-1.8216 2.055828,-1.76053 -0.0469,0.061 0.894159,-2.11786 1.009944,-2.23145 -0.186503,0.0177 -3.111405,-0.48369 -3.018889,-0.48312 z m 3.018889,0.48312 c 0.0076,-6.3e-4 0.01228,-0.002 0.01043,-0.004 -0.0019,-0.002 -0.0057,-8e-5 -0.01043,0.004 z m -3.065772,3.99198 c -0.0029,0.006 -0.0038,0.009 -1.14e-4,0.009 0.0038,3e-5 0.0029,-0.003 1.14e-4,-0.009 z m -2.981814,-4.02911 c -0.0046,-0.004 -0.0084,-0.007 -0.01026,-0.004 -0.0019,0.002 0.0027,0.003 0.01026,0.004 z m 7.810664,-0.004 c -0.07507,0 -0.22997,0.21944 -0.464637,0.65834 -0.05816,0.11226 -0.154486,0.27359 -0.289066,0.48391 -0.02975,0.046 -0.05752,0.091 -0.08322,0.13493 -0.238047,-0.54102 -0.366847,-0.87681 -0.386459,-1.00734 -0.02096,-0.13391 -0.05952,-0.20085 -0.115648,-0.20085 -0.02706,0 -0.05074,0.0139 -0.07103,0.0416 -0.02029,0.0277 -0.03348,0.0608 -0.03958,0.0994 0,0.004 0.04297,0.11467 0.128858,0.33175 0.161629,0.40915 0.256636,0.65155 0.28504,0.72729 0.06357,0.1738 0.104476,0.26072 0.122735,0.26072 0.04328,0 0.08051,-0.008 0.111624,-0.0253 0.03111,-0.0169 0.05067,-0.0389 0.05879,-0.0659 0.01285,-0.0487 0.05445,-0.12746 0.124775,-0.23635 0.0629,-0.098 0.142354,-0.22863 0.238384,-0.39162 0.12173,-0.20761 0.248922,-0.40709 0.381472,-0.59848 0.0399,-0.0574 0.06222,-0.09 0.06695,-0.0974 0.0054,-0.008 0.0081,-0.0173 0.0081,-0.0274 0,-0.0582 -0.0257,-0.0872 -0.0771,-0.0872 z m 2.897116,0.0538 c -0.04734,0 -0.07912,0.0355 -0.09535,0.10651 -0.01622,0.0717 -0.03482,0.14438 -0.05578,0.2181 -0.02096,0.073 -0.03686,0.11595 -0.04767,0.1288 -0.01082,0.0129 -0.02333,0.0193 -0.03752,0.0193 h -0.208963 c -0.03991,0 -0.05987,0.0196 -0.05987,0.0588 0,0.069 0.04331,0.10346 0.129878,0.10346 l 0.105502,-0.009 c 0.01623,0 0.02433,0.004 0.02433,0.0152 0,0.0291 -0.01658,0.11628 -0.04972,0.26168 -0.03381,0.14607 -0.05068,0.25393 -0.05068,0.32359 0,0.19273 0.08181,0.28912 0.245471,0.28912 0.09806,0 0.193755,-0.0386 0.287081,-0.11565 0.094,-0.0778 0.140989,-0.141 0.140989,-0.18969 0,-0.0311 -0.01452,-0.0466 -0.04359,-0.0466 -0.02165,0 -0.05245,0.0179 -0.09235,0.0537 -0.10347,0.0872 -0.18425,0.13091 -0.242409,0.13091 -0.03922,0 -0.06866,-0.0122 -0.08827,-0.0365 -0.01961,-0.0251 -0.02943,-0.0747 -0.02943,-0.1491 0,-0.046 0.01727,-0.14576 0.05176,-0.29927 0.03449,-0.1542 0.05475,-0.23463 0.06083,-0.2414 0.0067,-0.007 0.0514,-0.0166 0.133903,-0.0274 0.08251,-0.0108 0.172808,-0.0193 0.270868,-0.0253 0.07642,-0.004 0.114628,-0.0345 0.114628,-0.0893 0,-0.0236 -0.0068,-0.0402 -0.02029,-0.0496 -0.01353,-0.01 -0.046,-0.0142 -0.09739,-0.0142 -0.04057,0 -0.09129,0.003 -0.152158,0.0101 -0.06154,0.008 -0.127117,0.0138 -0.196773,0.0193 l 0.05884,-0.21305 c 0.02434,-0.0872 0.03651,-0.13554 0.03651,-0.14501 0,-0.0176 -0.0081,-0.0365 -0.02437,-0.0568 -0.01623,-0.0204 -0.03889,-0.0304 -0.06798,-0.0304 z m -7.720751,0.12539 c 0.07037,0 0.105558,0.0397 0.105558,0.1194 0,0.0138 -0.0036,0.0264 -0.01106,0.0376 -0.0065,0.0101 -0.03709,0.0547 -0.09173,0.13334 -0.181488,0.26205 -0.355561,0.53519 -0.522234,0.81946 -0.131486,0.22316 -0.24031,0.4018 -0.326424,0.53607 -0.0963,0.14908 -0.153216,0.25697 -0.17081,0.32364 -0.01111,0.0371 -0.03797,0.0672 -0.08056,0.0903 -0.04259,0.0232 -0.09352,0.0347 -0.152782,0.0347 -0.025,0 -0.08099,-0.119 -0.168031,-0.35697 -0.03889,-0.10372 -0.169011,-0.43557 -0.390315,-0.99577 -0.117597,-0.29724 -0.176364,-0.4487 -0.176364,-0.45427 0.0083,-0.0528 0.0263,-0.0981 0.05409,-0.13611 0.02777,-0.038 0.06024,-0.0569 0.09728,-0.0569 0.07686,0 0.129633,0.0916 0.158337,0.27495 0.02685,0.17872 0.20327,0.63847 0.529207,1.37923 0.03519,-0.0602 0.07315,-0.12173 0.113892,-0.1847 0.184266,-0.28798 0.316181,-0.50878 0.395814,-0.66249 0.321308,-0.60094 0.533343,-0.90144 0.636125,-0.90144 z m 1.209778,0.0611 c 0.255565,0 0.460628,0.0722 0.615263,0.2166 0.155561,0.14353 0.233395,0.33297 0.233395,0.56816 0,0.25834 -0.11111,0.49396 -0.33334,0.70694 -0.221305,0.21204 -0.537043,0.36716 -0.947244,0.46531 -0.162043,0.0389 -0.271793,0.0783 -0.329202,0.11809 -0.07593,0.0519 -0.138892,0.0778 -0.188894,0.0778 -0.03519,0 -0.06667,-0.0191 -0.09445,-0.057 -0.02685,-0.0371 -0.04031,-0.0666 -0.04031,-0.0888 0,-0.009 0.0093,-0.0333 0.02784,-0.0722 0.01944,-0.0417 0.03284,-0.0838 0.04025,-0.12642 0.0083,-0.0426 0.01524,-0.11895 0.0208,-0.22914 0.0047,-0.10927 0.0213,-0.28569 0.04999,-0.52921 0.02963,-0.24446 0.05377,-0.4176 0.07228,-0.51946 0.01667,-0.0889 0.02494,-0.14999 0.02494,-0.18333 0,-0.0361 -0.02087,-0.0598 -0.06253,-0.0708 -0.07593,-0.0185 -0.113891,-0.0505 -0.113891,-0.0959 0,-0.0343 0.01493,-0.0677 0.04456,-0.10007 0.03056,-0.0333 0.06291,-0.05 0.09717,-0.05 l 0.19445,0.006 c 0.09074,0 0.210188,-0.006 0.35834,-0.018 0.147228,-0.012 0.257413,-0.018 0.330564,-0.018 z m 8.865447,0.12182 c -0.08521,0 -0.19542,0.0443 -0.330676,0.13294 -0.134577,0.0886 -0.201875,0.20012 -0.201875,0.3347 0,0.0521 0.02398,0.0995 0.072,0.14207 0.04869,0.0419 0.14169,0.098 0.278975,0.16837 0.108203,0.0561 0.162304,0.10616 0.162304,0.15012 -0.02029,0.0372 -0.07336,0.0683 -0.159244,0.0933 -0.08589,0.0251 -0.166378,0.0376 -0.241445,0.0376 -0.0088,0 -0.02704,-0.003 -0.05477,-0.0101 -0.0284,-0.007 -0.04768,-0.0101 -0.05783,-0.0101 -0.02502,0 -0.05004,0.006 -0.07506,0.0182 -0.02434,0.0121 -0.03656,0.0311 -0.03656,0.0568 0,0.0744 0.05479,0.11156 0.164345,0.11156 0.129845,0 0.266103,-0.0291 0.408796,-0.0872 0.142694,-0.0588 0.214064,-0.13997 0.214064,-0.24343 0,-0.0561 -0.02301,-0.10484 -0.06899,-0.14609 -0.04531,-0.0419 -0.106182,-0.0812 -0.182601,-0.1177 -0.09468,-0.0446 -0.160254,-0.0821 -0.196773,-0.11258 -0.03652,-0.0311 -0.05477,-0.0656 -0.05477,-0.10347 0,-0.0622 0.05169,-0.11798 0.155163,-0.16735 0.10347,-0.0493 0.172142,-0.0741 0.205957,-0.0741 0.0067,0 0.02093,0.004 0.04257,0.0143 0.02165,0.0101 0.03621,0.0151 0.04366,0.0151 0.01014,0 0.02403,-0.007 0.04161,-0.0223 0.01826,-0.0149 0.02738,-0.0328 0.02738,-0.0538 0,-0.0467 -0.01251,-0.0795 -0.03752,-0.0984 -0.02434,-0.0189 -0.06393,-0.0284 -0.11871,-0.0284 z m -4.637914,0.0335 c -0.154868,0 -0.297551,0.0873 -0.428072,0.26174 -0.13052,0.17447 -0.195752,0.35842 -0.195752,0.55182 0,0.11497 0.02943,0.20459 0.08827,0.26883 0.05951,0.0642 0.143677,0.0964 0.252557,0.0964 0.129845,0 0.25566,-0.0487 0.377389,-0.14609 0.122406,-0.0974 0.183564,-0.18058 0.183564,-0.24955 0,-0.0344 -0.01079,-0.0518 -0.03242,-0.0518 -0.0115,0 -0.02843,0.0112 -0.05074,0.0335 -0.151486,0.16096 -0.299906,0.24145 -0.445305,0.24145 -0.06357,0 -0.11159,-0.0169 -0.144051,-0.0507 -0.03246,-0.0338 -0.0487,-0.0788 -0.0487,-0.13492 0,-0.0291 0.01756,-0.0528 0.05272,-0.071 0.171097,-0.092 0.3077,-0.1856 0.409817,-0.28095 0.102117,-0.0954 0.153178,-0.19513 0.153178,-0.29928 0,-0.0467 -0.01618,-0.0865 -0.04864,-0.11967 -0.03179,-0.0331 -0.07309,-0.0496 -0.123812,-0.0496 z m -4.277477,0.0531 c -0.120375,0 -0.265367,0.0111 -0.434818,0.0333 -0.03797,0.006 -0.07543,0.01 -0.112474,0.0126 -0.110189,0.66205 -0.165253,1.1292 -0.165253,1.40144 0,0.0602 0.006,0.10556 0.01803,0.13612 0.0074,0.006 0.02172,0.01 0.04303,0.01 0.05926,0 0.214382,-0.0389 0.465317,-0.11667 0.250935,-0.0778 0.454638,-0.19766 0.611124,-0.35971 0.156488,-0.16203 0.234757,-0.34629 0.234757,-0.55278 0,-0.1713 -0.06068,-0.30796 -0.181977,-0.40982 -0.120375,-0.10278 -0.279577,-0.15413 -0.477732,-0.15413 z m 7.320742,0.016 c -0.04193,0 -0.07268,0.0203 -0.09229,0.0608 0,0.0582 -0.01796,0.1593 -0.0538,0.30335 -0.04261,0.17245 -0.06389,0.30297 -0.06389,0.39156 0,0.1082 0.02301,0.18829 0.06899,0.24037 0.04666,0.0521 0.09227,0.0781 0.136908,0.0781 0.07777,0 0.161993,-0.0399 0.252613,-0.11967 0.09062,-0.0798 0.179203,-0.19242 0.265767,-0.33782 -6.88e-4,0.0115 -0.0011,0.0227 -0.0011,0.0335 v 0.0335 c 0,0.13729 0.01457,0.24112 0.04366,0.31146 0.02908,0.0703 0.06729,0.10545 0.114628,0.10545 0.02232,0 0.04699,-0.008 0.07404,-0.0233 0.02772,-0.0156 0.04161,-0.0328 0.04161,-0.0518 0,-0.0156 -0.01354,-0.0358 -0.04059,-0.0608 -0.05207,-0.0467 -0.07812,-0.14913 -0.07812,-0.30737 0,-0.13188 0.02031,-0.27187 0.06088,-0.41997 0.01285,-0.0419 0.01928,-0.0666 0.01928,-0.074 0,-0.0609 -0.02301,-0.0913 -0.06899,-0.0913 -0.03043,0 -0.05481,0.0121 -0.07307,0.0365 -0.01758,0.0237 -0.04053,0.0754 -0.06894,0.15521 -0.07236,0.19951 -0.159279,0.35504 -0.26072,0.46662 -0.101441,0.11159 -0.184974,0.16741 -0.250573,0.16741 -0.0514,0 -0.0771,-0.0555 -0.0771,-0.16638 0,-0.12173 0.03144,-0.26746 0.09433,-0.43719 0.03314,-0.0872 0.04972,-0.15454 0.04972,-0.20189 0,-0.0216 -0.0084,-0.0422 -0.02534,-0.0619 -0.01691,-0.0203 -0.03956,-0.0304 -0.06797,-0.0304 z m -2.419386,0.0355 c -0.01961,0 -0.04056,0.0159 -0.06286,0.0477 -0.02164,0.0311 -0.03249,0.0595 -0.03249,0.0852 0,0.22655 -0.01859,0.44193 -0.05578,0.64616 -0.01082,0.0596 -0.01621,0.10552 -0.01621,0.13799 0,0.0771 0.03987,0.11565 0.119673,0.11565 0.02165,0 0.04872,-0.0148 0.08118,-0.0446 0.03313,-0.0297 0.105826,-0.15218 0.218088,-0.36724 0.08521,-0.16028 0.148434,-0.26343 0.189686,-0.30942 0.04193,-0.046 0.08048,-0.069 0.11565,-0.069 0.06086,0 0.100738,0.0994 0.119673,0.29819 0.01826,0.19816 0.04299,0.32024 0.07409,0.36622 0.03179,0.0453 0.07642,0.068 0.133903,0.068 0.05613,0 0.104151,-0.0166 0.144051,-0.0497 0.03989,-0.0339 0.05981,-0.0656 0.05981,-0.0954 0,-0.0338 -0.01452,-0.0508 -0.04359,-0.0508 -0.0028,0 -0.0068,0.001 -0.01219,0.004 -0.03179,0.0149 -0.05818,0.0224 -0.07914,0.0224 -0.03314,0 -0.05746,-0.0204 -0.07302,-0.0609 -0.01488,-0.0412 -0.03181,-0.14539 -0.05074,-0.31243 -0.01758,-0.14675 -0.04564,-0.24784 -0.08419,-0.3033 -0.03787,-0.0555 -0.08721,-0.0832 -0.148076,-0.0832 -0.07642,0 -0.146412,0.0336 -0.209982,0.10045 -0.06357,0.067 -0.137636,0.18255 -0.22217,0.34689 -0.08386,0.16162 -0.130846,0.24247 -0.140989,0.24247 -0.0054,0 -0.0082,-0.006 -0.0082,-0.0162 0,-0.0189 0.0068,-0.0636 0.02029,-0.1339 0.04058,-0.21303 0.06088,-0.3537 0.06088,-0.42201 0,-0.0656 -0.0075,-0.1092 -0.02234,-0.13084 -0.01488,-0.0216 -0.03989,-0.0325 -0.07506,-0.0325 z m -0.675581,0.0487 c 0.03652,0 0.05477,0.0204 0.05477,0.0609 0,0.10347 -0.143371,0.24042 -0.430111,0.41084 0.03179,-0.13188 0.08658,-0.24347 0.164346,-0.33476 0.07845,-0.0913 0.148785,-0.13697 0.211003,-0.13697 z m 3.573266,1.43411 c -0.07507,0 -0.22997,0.21944 -0.464637,0.65835 -0.05816,0.11225 -0.154487,0.27358 -0.289065,0.4839 -0.02975,0.046 -0.05752,0.091 -0.08322,0.13493 -0.238048,-0.54103 -0.366848,-0.87681 -0.38646,-1.00733 -0.02096,-0.13391 -0.05952,-0.20086 -0.115648,-0.20086 -0.02706,0 -0.05074,0.0139 -0.07103,0.0416 -0.02029,0.0277 -0.03343,0.0608 -0.03951,0.0994 0,0.004 0.04291,0.11466 0.128801,0.33175 0.16163,0.40914 0.256637,0.6516 0.285041,0.72734 0.06357,0.1738 0.104475,0.26066 0.122735,0.26066 0.04328,0 0.08051,-0.008 0.111623,-0.0253 0.03111,-0.0169 0.05073,-0.0389 0.05884,-0.0659 0.01285,-0.0487 0.05445,-0.12746 0.124776,-0.23635 0.0629,-0.0981 0.142353,-0.22857 0.238384,-0.39156 0.121729,-0.20761 0.248865,-0.40715 0.381415,-0.59854 0.03991,-0.0574 0.06222,-0.09 0.06695,-0.0974 0.0054,-0.008 0.0081,-0.0173 0.0081,-0.0274 0,-0.0582 -0.02571,-0.0872 -0.0771,-0.0872 z m -3.337433,0.0447 c -0.05343,0 -0.133918,0.004 -0.241445,0.0131 -0.108205,0.009 -0.19541,0.0132 -0.261684,0.0132 l -0.142011,-0.004 c -0.02502,0 -0.04872,0.0122 -0.07103,0.0365 -0.02165,0.0236 -0.03242,0.048 -0.03242,0.073 0,0.0331 0.02771,0.0566 0.08316,0.07 0.03044,0.008 0.04564,0.0254 0.04564,0.0517 0,0.0244 -0.0061,0.069 -0.01826,0.1339 -0.01353,0.0744 -0.03109,0.20084 -0.05272,0.37938 -0.02097,0.17786 -0.03318,0.30671 -0.03656,0.38652 -0.004,0.0805 -0.0091,0.13624 -0.01519,0.16735 -0.0054,0.0311 -0.01522,0.0619 -0.02943,0.0923 -0.01353,0.0284 -0.02029,0.0459 -0.02029,0.0527 0,0.0162 0.0098,0.0378 0.02943,0.0649 0.02029,0.0277 0.04329,0.0416 0.06899,0.0416 0.03652,0 0.08247,-0.0189 0.137928,-0.0568 0.04193,-0.0291 0.122076,-0.0578 0.240425,-0.0862 0.299588,-0.0717 0.530222,-0.18494 0.691852,-0.3398 0.162306,-0.15555 0.24343,-0.32766 0.24343,-0.51635 0,-0.17177 -0.05679,-0.31009 -0.170413,-0.41491 -0.112937,-0.10551 -0.262735,-0.15823 -0.449386,-0.15823 z m -0.03651,0.15216 c 0.144723,0 0.261073,0.0375 0.348988,0.11259 0.08859,0.0744 0.132883,0.17415 0.132883,0.29926 0,0.15081 -0.05714,0.28535 -0.171433,0.4037 -0.11429,0.11835 -0.263111,0.20595 -0.446382,0.26276 -0.18327,0.0568 -0.296522,0.0852 -0.339803,0.0852 -0.01555,0 -0.02605,-0.002 -0.03147,-0.007 -0.0088,-0.0224 -0.01316,-0.0554 -0.01316,-0.0994 0,-0.19882 0.04022,-0.54001 0.120694,-1.02355 0.02706,-0.002 0.05441,-0.004 0.08214,-0.009 0.123758,-0.0162 0.229609,-0.0243 0.317524,-0.0243 z m 1.457686,0.19881 c -0.154866,0 -0.297549,0.0873 -0.428071,0.26174 -0.13052,0.17448 -0.195752,0.35841 -0.195752,0.55182 0,0.11497 0.02943,0.20459 0.08827,0.26883 0.05951,0.0642 0.143677,0.0964 0.252557,0.0964 0.129844,0 0.25566,-0.0487 0.377389,-0.14608 0.122405,-0.0974 0.183564,-0.18058 0.183564,-0.24956 0,-0.0345 -0.01079,-0.0518 -0.03243,-0.0518 -0.01149,0 -0.02842,0.0112 -0.05074,0.0335 -0.151485,0.16095 -0.299906,0.24144 -0.445305,0.24144 -0.06357,0 -0.11159,-0.0169 -0.144051,-0.0507 -0.03246,-0.0338 -0.04869,-0.0788 -0.04869,-0.13493 0,-0.0291 0.01756,-0.0527 0.05272,-0.071 0.171097,-0.092 0.307699,-0.1856 0.409816,-0.28096 0.102118,-0.0954 0.153179,-0.19512 0.153179,-0.29927 0,-0.0467 -0.01624,-0.0865 -0.0487,-0.11967 -0.03179,-0.0331 -0.07304,-0.0497 -0.123756,-0.0497 z m -0.05171,0.15318 c 0.03652,0 0.05477,0.0204 0.05477,0.0609 0,0.10347 -0.143371,0.24042 -0.430112,0.41084 0.03179,-0.13188 0.08658,-0.24346 0.164347,-0.33476 0.07845,-0.0913 0.148785,-0.13697 0.211002,-0.13697 z"
       inkscape:transform-center-x="4.0949628e-06"
       inkscape:export-filename="logoVentusDev.svg"
       inkscape:export-xdpi="96"
       inkscape:export-ydpi="96" />
  </g>
</svg>
</div>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>To wiadomość automatyczna. Proszę na nią nie odpowiadać.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset Successful</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We're writing to confirm that your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #4CAF50; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If you did not initiate this password reset, please contact our support team immediately.</p>
    <p>For security reasons, we recommend that you:</p>
    <ul>
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication if available</li>
      <li>Avoid using the same password across multiple sites</li>
    </ul>
    <p>Thank you for helping us keep your account secure.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const welcomeTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Welcome :)</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const ORDER_VERYFIKATION = `
<h1 class="title">Zweryfikuj swoje zamówienie</h1>
  </div>
  <div class="mailContent">
    <p>Cześć,</p>
    <p>Udało Ci się pomyślnie złożyć zamówienie. ;)</p> 
    <div class="itemsBox">
      {itemsForMail}
    </div>
    <p> Potwierdź je wpisując kod z obrazka pod wskazany link:</p>
    <div class="codeBox">
      <span class="code">{verificationCode}</span>
    </div>
    <div  class="messageBox">
    <div class="messageContent">
    <a href="{orderPath}" class="button">Potwierdzam zamówienie</a>
    <p class="codeExpiried">Kod za godzinę wygaśnie!</p>
    <p>Pozdrowienia</p>
`

export const MAIL_FOOTER = `
  </div>
  <h4 class="logo">Ventus <br>Dev</h4>
</div>
  </div>
  <div class="dontReplay">
    <p>To wiadomość automatyczna. Proszę na nią nie odpowiadać.</p>
  </div>
</body>
</html>`