/*
 * Copyright 2004 ThoughtWorks, Inc
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

// Although it's generally better web development practice not to use
// browser-detection (feature detection is better), the subtle browser
// differences that Selenium has to work around seem to make it
// necessary. Maybe as we learn more about what we need, we can do this in
// a more "feature-centric" rather than "browser-centric" way.

var BrowserVersion = function() {
    this.name = navigator.appName;

    if (navigator.userAgent.indexOf('Mac OS X') != -1) {
        this.isOSX = true;
    }

    if (navigator.userAgent.indexOf('Windows NT 6') != -1) {
        this.isVista = true;
    }

    if (window.opera != null) {
        this.browser = BrowserVersion.OPERA;
        this.isOpera = true;
        return;
    }
    
    var _getQueryParameter = function(searchKey) {
        var str = location.search.substr(1);
        if (str == null) return null;
        var clauses = str.split('&');
        for (var i = 0; i < clauses.length; i++) {
            var keyValuePair = clauses[i].split('=', 2);
            var key = unescape(keyValuePair[0]);
            if (key == searchKey) {
                return unescape(keyValuePair[1]);
            }
        }
        return null;
    };
    
    var self = this;
    
    var checkChrome = function() {
        var loc = window.document.location.href;
        try {
            loc = window.top.document.location.href;
            if (/^chrome:\/\//.test(loc)) {
                self.isChrome = true;
            } else {
                self.isChrome = false;
            }
        } catch (e) {
            // can't see the top (that means we might be chrome, but it's impossible to be sure)
            self.isChromeDetectable = "no, top location couldn't be read in this window";
            if (_getQueryParameter('thisIsChrome')) {
                self.isChrome = true;
            } else {
                self.isChrome = false;
            }
        }
        
        
    }
    
    

    if (this.name == "Microsoft Internet Explorer") {
        this.browser = BrowserVersion.IE;
        this.isIE = true;
        try {
            if (window.top.SeleniumHTARunner && window.top.document.location.pathname.match(/.hta$/i)) {
                this.isHTA = true;
            }
        } catch (e) {
            this.isHTADetectable = "no, top location couldn't be read in this window";
            if (_getQueryParameter('thisIsHTA')) {
                self.isHTA = true;
            } else {
                self.isHTA = false;
            }
        }
        if (navigator.appVersion.match(/MSIE 6.0/)) {
        	this.isIE6 = true;
        }
        if ("0" == navigator.appMinorVersion) {
            this.preSV1 = true;
            if (this.isIE6) {
            	this.appearsToBeBrokenInitialIE6 = true;
            }
        }
        return;
    }

    if (navigator.userAgent.indexOf('Safari') != -1) {
        this.browser = BrowserVersion.SAFARI;
        this.isSafari = true;
        this.khtml = true;
        return;
    }

    if (navigator.userAgent.indexOf('Konqueror') != -1) {
        this.browser = BrowserVersion.KONQUEROR;
        this.isKonqueror = true;
        this.khtml = true;
        return;
    }

    if (navigator.userAgent.indexOf('Firefox') != -1) {
        this.browser = BrowserVersion.FIREFOX;
        this.isFirefox = true;
        this.isGecko = true;
        var result = /.*Firefox\/([\d\.]+).*/.exec(navigator.userAgent);
        if (result) {
            this.firefoxVersion = result[1];
        }
        checkChrome();
        return;
    }

    if (navigator.userAgent.indexOf('Gecko') != -1) {
        this.browser = BrowserVersion.MOZILLA;
        this.isMozilla = true;
        this.isGecko = true;
        checkChrome();
        return;
    }

    this.browser = BrowserVersion.UNKNOWN;
}

BrowserVersion.OPERA = "Opera";
BrowserVersion.IE = "IE";
BrowserVersion.KONQUEROR = "Konqueror";
BrowserVersion.SAFARI = "Safari";
BrowserVersion.FIREFOX = "Firefox";
BrowserVersion.MOZILLA = "Mozilla";
BrowserVersion.UNKNOWN = "Unknown";

var browserVersion = new BrowserVersion();
/*
	cssQuery, version 2.0.2 (2005-08-19)
	Copyright: 2004-2005, Dean Edwards (http://dean.edwards.name/)
	License: http://creativecommons.org/licenses/LGPL/2.1/
*/
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('7 x=6(){7 1D="2.0.2";7 C=/\\s*,\\s*/;7 x=6(s,A){33{7 m=[];7 u=1z.32.2c&&!A;7 b=(A)?(A.31==22)?A:[A]:[1g];7 1E=18(s).1l(C),i;9(i=0;i<1E.y;i++){s=1y(1E[i]);8(U&&s.Z(0,3).2b("")==" *#"){s=s.Z(2);A=24([],b,s[1])}1A A=b;7 j=0,t,f,a,c="";H(j<s.y){t=s[j++];f=s[j++];c+=t+f;a="";8(s[j]=="("){H(s[j++]!=")")a+=s[j];a=a.Z(0,-1);c+="("+a+")"}A=(u&&V[c])?V[c]:21(A,t,f,a);8(u)V[c]=A}m=m.30(A)}2a x.2d;5 m}2Z(e){x.2d=e;5[]}};x.1Z=6(){5"6 x() {\\n  [1D "+1D+"]\\n}"};7 V={};x.2c=L;x.2Y=6(s){8(s){s=1y(s).2b("");2a V[s]}1A V={}};7 29={};7 19=L;x.15=6(n,s){8(19)1i("s="+1U(s));29[n]=12 s()};x.2X=6(c){5 c?1i(c):o};7 D={};7 h={};7 q={P:/\\[([\\w-]+(\\|[\\w-]+)?)\\s*(\\W?=)?\\s*([^\\]]*)\\]/};7 T=[];D[" "]=6(r,f,t,n){7 e,i,j;9(i=0;i<f.y;i++){7 s=X(f[i],t,n);9(j=0;(e=s[j]);j++){8(M(e)&&14(e,n))r.z(e)}}};D["#"]=6(r,f,i){7 e,j;9(j=0;(e=f[j]);j++)8(e.B==i)r.z(e)};D["."]=6(r,f,c){c=12 1t("(^|\\\\s)"+c+"(\\\\s|$)");7 e,i;9(i=0;(e=f[i]);i++)8(c.l(e.1V))r.z(e)};D[":"]=6(r,f,p,a){7 t=h[p],e,i;8(t)9(i=0;(e=f[i]);i++)8(t(e,a))r.z(e)};h["2W"]=6(e){7 d=Q(e);8(d.1C)9(7 i=0;i<d.1C.y;i++){8(d.1C[i]==e)5 K}};h["2V"]=6(e){};7 M=6(e){5(e&&e.1c==1&&e.1f!="!")?e:23};7 16=6(e){H(e&&(e=e.2U)&&!M(e))28;5 e};7 G=6(e){H(e&&(e=e.2T)&&!M(e))28;5 e};7 1r=6(e){5 M(e.27)||G(e.27)};7 1P=6(e){5 M(e.26)||16(e.26)};7 1o=6(e){7 c=[];e=1r(e);H(e){c.z(e);e=G(e)}5 c};7 U=K;7 1h=6(e){7 d=Q(e);5(2S d.25=="2R")?/\\.1J$/i.l(d.2Q):2P(d.25=="2O 2N")};7 Q=6(e){5 e.2M||e.1g};7 X=6(e,t){5(t=="*"&&e.1B)?e.1B:e.X(t)};7 17=6(e,t,n){8(t=="*")5 M(e);8(!14(e,n))5 L;8(!1h(e))t=t.2L();5 e.1f==t};7 14=6(e,n){5!n||(n=="*")||(e.2K==n)};7 1e=6(e){5 e.1G};6 24(r,f,B){7 m,i,j;9(i=0;i<f.y;i++){8(m=f[i].1B.2J(B)){8(m.B==B)r.z(m);1A 8(m.y!=23){9(j=0;j<m.y;j++){8(m[j].B==B)r.z(m[j])}}}}5 r};8(![].z)22.2I.z=6(){9(7 i=0;i<1z.y;i++){o[o.y]=1z[i]}5 o.y};7 N=/\\|/;6 21(A,t,f,a){8(N.l(f)){f=f.1l(N);a=f[0];f=f[1]}7 r=[];8(D[t]){D[t](r,A,f,a)}5 r};7 S=/^[^\\s>+~]/;7 20=/[\\s#.:>+~()@]|[^\\s#.:>+~()@]+/g;6 1y(s){8(S.l(s))s=" "+s;5 s.P(20)||[]};7 W=/\\s*([\\s>+~(),]|^|$)\\s*/g;7 I=/([\\s>+~,]|[^(]\\+|^)([#.:@])/g;7 18=6(s){5 s.O(W,"$1").O(I,"$1*$2")};7 1u={1Z:6(){5"\'"},P:/^(\'[^\']*\')|("[^"]*")$/,l:6(s){5 o.P.l(s)},1S:6(s){5 o.l(s)?s:o+s+o},1Y:6(s){5 o.l(s)?s.Z(1,-1):s}};7 1s=6(t){5 1u.1Y(t)};7 E=/([\\/()[\\]?{}|*+-])/g;6 R(s){5 s.O(E,"\\\\$1")};x.15("1j-2H",6(){D[">"]=6(r,f,t,n){7 e,i,j;9(i=0;i<f.y;i++){7 s=1o(f[i]);9(j=0;(e=s[j]);j++)8(17(e,t,n))r.z(e)}};D["+"]=6(r,f,t,n){9(7 i=0;i<f.y;i++){7 e=G(f[i]);8(e&&17(e,t,n))r.z(e)}};D["@"]=6(r,f,a){7 t=T[a].l;7 e,i;9(i=0;(e=f[i]);i++)8(t(e))r.z(e)};h["2G-10"]=6(e){5!16(e)};h["1x"]=6(e,c){c=12 1t("^"+c,"i");H(e&&!e.13("1x"))e=e.1n;5 e&&c.l(e.13("1x"))};q.1X=/\\\\:/g;q.1w="@";q.J={};q.O=6(m,a,n,c,v){7 k=o.1w+m;8(!T[k]){a=o.1W(a,c||"",v||"");T[k]=a;T.z(a)}5 T[k].B};q.1Q=6(s){s=s.O(o.1X,"|");7 m;H(m=s.P(o.P)){7 r=o.O(m[0],m[1],m[2],m[3],m[4]);s=s.O(o.P,r)}5 s};q.1W=6(p,t,v){7 a={};a.B=o.1w+T.y;a.2F=p;t=o.J[t];t=t?t(o.13(p),1s(v)):L;a.l=12 2E("e","5 "+t);5 a};q.13=6(n){1d(n.2D()){F"B":5"e.B";F"2C":5"e.1V";F"9":5"e.2B";F"1T":8(U){5"1U((e.2A.P(/1T=\\\\1v?([^\\\\s\\\\1v]*)\\\\1v?/)||[])[1]||\'\')"}}5"e.13(\'"+n.O(N,":")+"\')"};q.J[""]=6(a){5 a};q.J["="]=6(a,v){5 a+"=="+1u.1S(v)};q.J["~="]=6(a,v){5"/(^| )"+R(v)+"( |$)/.l("+a+")"};q.J["|="]=6(a,v){5"/^"+R(v)+"(-|$)/.l("+a+")"};7 1R=18;18=6(s){5 1R(q.1Q(s))}});x.15("1j-2z",6(){D["~"]=6(r,f,t,n){7 e,i;9(i=0;(e=f[i]);i++){H(e=G(e)){8(17(e,t,n))r.z(e)}}};h["2y"]=6(e,t){t=12 1t(R(1s(t)));5 t.l(1e(e))};h["2x"]=6(e){5 e==Q(e).1H};h["2w"]=6(e){7 n,i;9(i=0;(n=e.1F[i]);i++){8(M(n)||n.1c==3)5 L}5 K};h["1N-10"]=6(e){5!G(e)};h["2v-10"]=6(e){e=e.1n;5 1r(e)==1P(e)};h["2u"]=6(e,s){7 n=x(s,Q(e));9(7 i=0;i<n.y;i++){8(n[i]==e)5 L}5 K};h["1O-10"]=6(e,a){5 1p(e,a,16)};h["1O-1N-10"]=6(e,a){5 1p(e,a,G)};h["2t"]=6(e){5 e.B==2s.2r.Z(1)};h["1M"]=6(e){5 e.1M};h["2q"]=6(e){5 e.1q===L};h["1q"]=6(e){5 e.1q};h["1L"]=6(e){5 e.1L};q.J["^="]=6(a,v){5"/^"+R(v)+"/.l("+a+")"};q.J["$="]=6(a,v){5"/"+R(v)+"$/.l("+a+")"};q.J["*="]=6(a,v){5"/"+R(v)+"/.l("+a+")"};6 1p(e,a,t){1d(a){F"n":5 K;F"2p":a="2n";1a;F"2o":a="2n+1"}7 1m=1o(e.1n);6 1k(i){7 i=(t==G)?1m.y-i:i-1;5 1m[i]==e};8(!Y(a))5 1k(a);a=a.1l("n");7 m=1K(a[0]);7 s=1K(a[1]);8((Y(m)||m==1)&&s==0)5 K;8(m==0&&!Y(s))5 1k(s);8(Y(s))s=0;7 c=1;H(e=t(e))c++;8(Y(m)||m==1)5(t==G)?(c<=s):(s>=c);5(c%m)==s}});x.15("1j-2m",6(){U=1i("L;/*@2l@8(@\\2k)U=K@2j@*/");8(!U){X=6(e,t,n){5 n?e.2i("*",t):e.X(t)};14=6(e,n){5!n||(n=="*")||(e.2h==n)};1h=1g.1I?6(e){5/1J/i.l(Q(e).1I)}:6(e){5 Q(e).1H.1f!="2g"};1e=6(e){5 e.2f||e.1G||1b(e)};6 1b(e){7 t="",n,i;9(i=0;(n=e.1F[i]);i++){1d(n.1c){F 11:F 1:t+=1b(n);1a;F 3:t+=n.2e;1a}}5 t}}});19=K;5 x}();',62,190,'|||||return|function|var|if|for||||||||pseudoClasses||||test|||this||AttributeSelector|||||||cssQuery|length|push|fr|id||selectors||case|nextElementSibling|while||tests|true|false|thisElement||replace|match|getDocument|regEscape||attributeSelectors|isMSIE|cache||getElementsByTagName|isNaN|slice|child||new|getAttribute|compareNamespace|addModule|previousElementSibling|compareTagName|parseSelector|loaded|break|_0|nodeType|switch|getTextContent|tagName|document|isXML|eval|css|_1|split|ch|parentNode|childElements|nthChild|disabled|firstElementChild|getText|RegExp|Quote|x22|PREFIX|lang|_2|arguments|else|all|links|version|se|childNodes|innerText|documentElement|contentType|xml|parseInt|indeterminate|checked|last|nth|lastElementChild|parse|_3|add|href|String|className|create|NS_IE|remove|toString|ST|select|Array|null|_4|mimeType|lastChild|firstChild|continue|modules|delete|join|caching|error|nodeValue|textContent|HTML|prefix|getElementsByTagNameNS|end|x5fwin32|cc_on|standard||odd|even|enabled|hash|location|target|not|only|empty|root|contains|level3|outerHTML|htmlFor|class|toLowerCase|Function|name|first|level2|prototype|item|scopeName|toUpperCase|ownerDocument|Document|XML|Boolean|URL|unknown|typeof|nextSibling|previousSibling|visited|link|valueOf|clearCache|catch|concat|constructor|callee|try'.split('|'),0,{}))
// Copyright 2006 Google Inc.
// All Rights Reserved
//
// Defines regular expression patterns to extract XML tokens from string.
// See <http://www.w3.org/TR/REC-xml/#sec-common-syn>,
// <http://www.w3.org/TR/xml11/#sec-common-syn> and
// <http://www.w3.org/TR/REC-xml-names/#NT-NCName> for the specifications.
//
// Author: Junji Takagi <jtakagi@google.com>

// Detect whether RegExp supports Unicode characters or not.

var REGEXP_UNICODE = function() {
  var tests = [' ', '\u0120', -1,  // Konquerer 3.4.0 fails here.
               '!', '\u0120', -1,
               '\u0120', '\u0120', 0,
               '\u0121', '\u0120', -1,
               '\u0121', '\u0120|\u0121', 0,
               '\u0122', '\u0120|\u0121', -1,
               '\u0120', '[\u0120]', 0,  // Safari 2.0.3 fails here.
               '\u0121', '[\u0120]', -1,
               '\u0121', '[\u0120\u0121]', 0,  // Safari 2.0.3 fails here.
               '\u0122', '[\u0120\u0121]', -1,
               '\u0121', '[\u0120-\u0121]', 0,  // Safari 2.0.3 fails here.
               '\u0122', '[\u0120-\u0121]', -1];
  for (var i = 0; i < tests.length; i += 3) {
    if (tests[i].search(new RegExp(tests[i + 1])) != tests[i + 2]) {
      return false;
    }
  }
  return true;
}();

// Common tokens in XML 1.0 and XML 1.1.

var XML_S = '[ \t\r\n]+';
var XML_EQ = '(' + XML_S + ')?=(' + XML_S + ')?';
var XML_CHAR_REF = '&#[0-9]+;|&#x[0-9a-fA-F]+;';

// XML 1.0 tokens.

var XML10_VERSION_INFO = XML_S + 'version' + XML_EQ + '("1\\.0"|' + "'1\\.0')";
var XML10_BASE_CHAR = (REGEXP_UNICODE) ?
  '\u0041-\u005a\u0061-\u007a\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u00ff' +
  '\u0100-\u0131\u0134-\u013e\u0141-\u0148\u014a-\u017e\u0180-\u01c3' +
  '\u01cd-\u01f0\u01f4-\u01f5\u01fa-\u0217\u0250-\u02a8\u02bb-\u02c1\u0386' +
  '\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03ce\u03d0-\u03d6\u03da\u03dc' +
  '\u03de\u03e0\u03e2-\u03f3\u0401-\u040c\u040e-\u044f\u0451-\u045c' +
  '\u045e-\u0481\u0490-\u04c4\u04c7-\u04c8\u04cb-\u04cc\u04d0-\u04eb' +
  '\u04ee-\u04f5\u04f8-\u04f9\u0531-\u0556\u0559\u0561-\u0586\u05d0-\u05ea' +
  '\u05f0-\u05f2\u0621-\u063a\u0641-\u064a\u0671-\u06b7\u06ba-\u06be' +
  '\u06c0-\u06ce\u06d0-\u06d3\u06d5\u06e5-\u06e6\u0905-\u0939\u093d' +
  '\u0958-\u0961\u0985-\u098c\u098f-\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2' +
  '\u09b6-\u09b9\u09dc-\u09dd\u09df-\u09e1\u09f0-\u09f1\u0a05-\u0a0a' +
  '\u0a0f-\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32-\u0a33\u0a35-\u0a36' +
  '\u0a38-\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8b\u0a8d' +
  '\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2-\u0ab3\u0ab5-\u0ab9' +
  '\u0abd\u0ae0\u0b05-\u0b0c\u0b0f-\u0b10\u0b13-\u0b28\u0b2a-\u0b30' +
  '\u0b32-\u0b33\u0b36-\u0b39\u0b3d\u0b5c-\u0b5d\u0b5f-\u0b61\u0b85-\u0b8a' +
  '\u0b8e-\u0b90\u0b92-\u0b95\u0b99-\u0b9a\u0b9c\u0b9e-\u0b9f\u0ba3-\u0ba4' +
  '\u0ba8-\u0baa\u0bae-\u0bb5\u0bb7-\u0bb9\u0c05-\u0c0c\u0c0e-\u0c10' +
  '\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c60-\u0c61\u0c85-\u0c8c' +
  '\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cde\u0ce0-\u0ce1' +
  '\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d28\u0d2a-\u0d39\u0d60-\u0d61' +
  '\u0e01-\u0e2e\u0e30\u0e32-\u0e33\u0e40-\u0e45\u0e81-\u0e82\u0e84' +
  '\u0e87-\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5' +
  '\u0ea7\u0eaa-\u0eab\u0ead-\u0eae\u0eb0\u0eb2-\u0eb3\u0ebd\u0ec0-\u0ec4' +
  '\u0f40-\u0f47\u0f49-\u0f69\u10a0-\u10c5\u10d0-\u10f6\u1100\u1102-\u1103' +
  '\u1105-\u1107\u1109\u110b-\u110c\u110e-\u1112\u113c\u113e\u1140\u114c' +
  '\u114e\u1150\u1154-\u1155\u1159\u115f-\u1161\u1163\u1165\u1167\u1169' +
  '\u116d-\u116e\u1172-\u1173\u1175\u119e\u11a8\u11ab\u11ae-\u11af' +
  '\u11b7-\u11b8\u11ba\u11bc-\u11c2\u11eb\u11f0\u11f9\u1e00-\u1e9b' +
  '\u1ea0-\u1ef9\u1f00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d' +
  '\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc' +
  '\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec' +
  '\u1ff2-\u1ff4\u1ff6-\u1ffc\u2126\u212a-\u212b\u212e\u2180-\u2182' +
  '\u3041-\u3094\u30a1-\u30fa\u3105-\u312c\uac00-\ud7a3' :
  'A-Za-z';
var XML10_IDEOGRAPHIC = (REGEXP_UNICODE) ?
  '\u4e00-\u9fa5\u3007\u3021-\u3029' :
  '';
var XML10_COMBINING_CHAR = (REGEXP_UNICODE) ?
  '\u0300-\u0345\u0360-\u0361\u0483-\u0486\u0591-\u05a1\u05a3-\u05b9' +
  '\u05bb-\u05bd\u05bf\u05c1-\u05c2\u05c4\u064b-\u0652\u0670\u06d6-\u06dc' +
  '\u06dd-\u06df\u06e0-\u06e4\u06e7-\u06e8\u06ea-\u06ed\u0901-\u0903\u093c' +
  '\u093e-\u094c\u094d\u0951-\u0954\u0962-\u0963\u0981-\u0983\u09bc\u09be' +
  '\u09bf\u09c0-\u09c4\u09c7-\u09c8\u09cb-\u09cd\u09d7\u09e2-\u09e3\u0a02' +
  '\u0a3c\u0a3e\u0a3f\u0a40-\u0a42\u0a47-\u0a48\u0a4b-\u0a4d\u0a70-\u0a71' +
  '\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0b01-\u0b03' +
  '\u0b3c\u0b3e-\u0b43\u0b47-\u0b48\u0b4b-\u0b4d\u0b56-\u0b57\u0b82-\u0b83' +
  '\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0c01-\u0c03\u0c3e-\u0c44' +
  '\u0c46-\u0c48\u0c4a-\u0c4d\u0c55-\u0c56\u0c82-\u0c83\u0cbe-\u0cc4' +
  '\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5-\u0cd6\u0d02-\u0d03\u0d3e-\u0d43' +
  '\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1' +
  '\u0eb4-\u0eb9\u0ebb-\u0ebc\u0ec8-\u0ecd\u0f18-\u0f19\u0f35\u0f37\u0f39' +
  '\u0f3e\u0f3f\u0f71-\u0f84\u0f86-\u0f8b\u0f90-\u0f95\u0f97\u0f99-\u0fad' +
  '\u0fb1-\u0fb7\u0fb9\u20d0-\u20dc\u20e1\u302a-\u302f\u3099\u309a' :
  '';
var XML10_DIGIT = (REGEXP_UNICODE) ?
  '\u0030-\u0039\u0660-\u0669\u06f0-\u06f9\u0966-\u096f\u09e6-\u09ef' +
  '\u0a66-\u0a6f\u0ae6-\u0aef\u0b66-\u0b6f\u0be7-\u0bef\u0c66-\u0c6f' +
  '\u0ce6-\u0cef\u0d66-\u0d6f\u0e50-\u0e59\u0ed0-\u0ed9\u0f20-\u0f29' :
  '0-9';
var XML10_EXTENDER = (REGEXP_UNICODE) ?
  '\u00b7\u02d0\u02d1\u0387\u0640\u0e46\u0ec6\u3005\u3031-\u3035' +
  '\u309d-\u309e\u30fc-\u30fe' :
  '';
var XML10_LETTER = XML10_BASE_CHAR + XML10_IDEOGRAPHIC;
var XML10_NAME_CHAR = XML10_LETTER + XML10_DIGIT + '\\._:' +
                      XML10_COMBINING_CHAR + XML10_EXTENDER + '-';
var XML10_NAME = '[' + XML10_LETTER + '_:][' + XML10_NAME_CHAR + ']*';

var XML10_ENTITY_REF = '&' + XML10_NAME + ';';
var XML10_REFERENCE = XML10_ENTITY_REF + '|' + XML_CHAR_REF;
var XML10_ATT_VALUE = '"(([^<&"]|' + XML10_REFERENCE + ')*)"|' +
                      "'(([^<&']|" + XML10_REFERENCE + ")*)'";
var XML10_ATTRIBUTE =
  '(' + XML10_NAME + ')' + XML_EQ + '(' + XML10_ATT_VALUE + ')';

// XML 1.1 tokens.
// TODO(jtakagi): NameStartChar also includes \u10000-\ueffff.
// ECMAScript Language Specifiction defines UnicodeEscapeSequence as
// "\u HexDigit HexDigit HexDigit HexDigit" and we may need to use
// surrogate pairs, but any browser doesn't support surrogate paris in
// character classes of regular expression, so avoid including them for now.

var XML11_VERSION_INFO = XML_S + 'version' + XML_EQ + '("1\\.1"|' + "'1\\.1')";
var XML11_NAME_START_CHAR = (REGEXP_UNICODE) ?
  ':A-Z_a-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02ff\u0370-\u037d' +
  '\u037f-\u1fff\u200c-\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff' +
  '\uf900-\ufdcf\ufdf0-\ufffd' :
  ':A-Z_a-z';
var XML11_NAME_CHAR = XML11_NAME_START_CHAR +
  ((REGEXP_UNICODE) ? '\\.0-9\u00b7\u0300-\u036f\u203f-\u2040-' : '\\.0-9-');
var XML11_NAME = '[' + XML11_NAME_START_CHAR + '][' + XML11_NAME_CHAR + ']*';

var XML11_ENTITY_REF = '&' + XML11_NAME + ';';
var XML11_REFERENCE = XML11_ENTITY_REF + '|' + XML_CHAR_REF;
var XML11_ATT_VALUE = '"(([^<&"]|' + XML11_REFERENCE + ')*)"|' +
                      "'(([^<&']|" + XML11_REFERENCE + ")*)'";
var XML11_ATTRIBUTE =
  '(' + XML11_NAME + ')' + XML_EQ + '(' + XML11_ATT_VALUE + ')';

// XML Namespace tokens.
// Used in XML parser and XPath parser.

var XML_NC_NAME_CHAR = XML10_LETTER + XML10_DIGIT + '\\._' +
                       XML10_COMBINING_CHAR + XML10_EXTENDER + '-';
var XML_NC_NAME = '[' + XML10_LETTER + '_][' + XML_NC_NAME_CHAR + ']*';
/*
 * Copyright 2004 ThoughtWorks, Inc
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

var Logger = function() {
    this.logWindow = null;
}
Logger.prototype = {

    logLevels: {
        debug: 0,
        info: 1,
        warn: 2,
        error: 3,
        off: 999
    },

    pendingMessages: new Array(),
    
    threshold: "info",

    setLogLevelThreshold: function(logLevel) {
        this.threshold = logLevel;
        var logWindow = this.getLogWindow()
        if (logWindow && logWindow.setThresholdLevel) {
            logWindow.setThresholdLevel(logLevel);
        }
        // NOTE: log messages will be discarded until the log window is
        // fully loaded.
    },

    getLogWindow: function() {
        if (this.logWindow && this.logWindow.closed) {
            this.logWindow = null;
        }
        return this.logWindow;
    },
    
    openLogWindow: function() {
        this.logWindow = window.open(
            getDocumentBase(document) + "SeleniumLog.html?startingThreshold="+this.threshold, "SeleniumLog",
            "width=600,height=1000,bottom=0,right=0,status,scrollbars,resizable"
        );
        this.logWindow.moveTo(window.screenX + 1210, window.screenY + window.outerHeight - 1400);
        if (browserVersion.appearsToBeBrokenInitialIE6) {
	// I would really prefer for the message to immediately appear in the log window, the instant the user requests that the log window be 
        	// visible.  But when I initially coded it this way, thou message simply didn't appear unless I stepped through the code with a debugger.  
        	// So obviously there is some timing issue here which I don't have the patience to figure out.
        	var pendingMessage = new LogMessage("warn", "You appear to be running an unpatched IE 6, which is not stable and can crash due to memory problems.  We recommend you run Windows update to install a more stable version of IE.");
            this.pendingMessages.push(pendingMessage);
        }
        return this.logWindow;
    },
    
    show: function() {
        if (! this.getLogWindow()) {
            this.openLogWindow();
        }
        setTimeout(function(){LOG.error("Log window displayed.  Logging events will now be recorded to this window.");}, 500);
    },

    logHook: function(logLevel, message) {
    },

    log: function(logLevel, message) {
        if (this.logLevels[logLevel] < this.logLevels[this.threshold]) {
            return;
        }
        this.logHook(logLevel, message);
        var logWindow = this.getLogWindow();
        if (logWindow) {
            if (logWindow.append) {
                if (logWindow.disabled) {
                    logWindow.callBack = fnBind(this.setLogLevelThreshold, this);
                    logWindow.enableButtons();
                }
                if (this.pendingMessages.length > 0) {
                    logWindow.append("info("+(new Date().getTime())+"): Appending missed logging messages", "info");
                    while (this.pendingMessages.length > 0) {
                        var msg = this.pendingMessages.shift();
                        logWindow.append(msg.type + "("+msg.timestamp+"): " + msg.msg, msg.type);
                    }
                    logWindow.append("info("+(new Date().getTime())+"): Done appending missed logging messages", "info");
                }
                logWindow.append(logLevel + "("+(new Date().getTime())+"): " + message, logLevel);
            }
        } else {
            // TODO these logging messages are never flushed, which creates 
            //   an enormous array of strings that never stops growing.
            //   there should at least be a way to clear the messages!
            this.pendingMessages.push(new LogMessage(logLevel, message));
        }
    },

    close: function(message) {
        if (this.logWindow != null) {
            try {
                this.logWindow.close();
            } catch (e) {
                // swallow exception
                // the window is probably closed if we get an exception here
            }
            this.logWindow = null;
        }
    },

    debug: function(message) {
       this.log("debug", message);
    },

    info: function(message) {
       this.log("info", message);
    },

    warn: function(message) {
       this.log("warn", message);
    },

    error: function(message) {
       this.log("error", message);
    },

    exception: function(exception) {
        this.error("Unexpected Exception: " + extractExceptionMessage(exception));
        this.error("Exception details: " + describe(exception, ', '));
    }

};

var LOG = new Logger();

var LogMessage = function(type, msg) {
    this.type = type;
    this.msg = msg;
    this.timestamp = (new Date().getTime());
}
// Copyright 2005 Google Inc.
// All Rights Reserved
//
// Author: Steffen Meschkat <mesch@google.com>
//
// An XML parse and a minimal DOM implementation that just supportes
// the subset of the W3C DOM that is used in the XSLT implementation.

// NOTE: The split() method in IE omits empty result strings. This is
// utterly annoying. So we don't use it here.

// Resolve entities in XML text fragments. According to the DOM
// specification, the DOM is supposed to resolve entity references at
// the API level. I.e. no entity references are passed through the
// API. See "Entities and the DOM core", p.12, DOM 2 Core
// Spec. However, different browsers actually pass very different
// values at the API. See <http://mesch.nyc/test-xml-quote>.
function xmlResolveEntities(s) {

  var parts = stringSplit(s, '&');

  var ret = parts[0];
  for (var i = 1; i < parts.length; ++i) {
    var rp = parts[i].indexOf(';');
    if (rp == -1) {
      // no entity reference: just a & but no ;
      ret += parts[i];
      continue;
    }

    var entityName = parts[i].substring(0, rp);
    var remainderText = parts[i].substring(rp + 1);

    var ch;
    switch (entityName) {
      case 'lt':
        ch = '<';
        break;
      case 'gt':
        ch = '>';
        break;
      case 'amp':
        ch = '&';
        break;
      case 'quot':
        ch = '"';
        break;
      case 'apos':
        ch = '\'';
        break;
      case 'nbsp':
        ch = String.fromCharCode(160);
        break;
      default:
        // Cool trick: let the DOM do the entity decoding. We assign
        // the entity text through non-W3C DOM properties and read it
        // through the W3C DOM. W3C DOM access is specified to resolve
        // entities.
        var span = domCreateElement(window.document, 'span');
        span.innerHTML = '&' + entityName + '; ';
        ch = span.childNodes[0].nodeValue.charAt(0);
    }
    ret += ch + remainderText;
  }

  return ret;
}

var XML10_TAGNAME_REGEXP = new RegExp('^(' + XML10_NAME + ')');
var XML10_ATTRIBUTE_REGEXP = new RegExp(XML10_ATTRIBUTE, 'g');

var XML11_TAGNAME_REGEXP = new RegExp('^(' + XML11_NAME + ')');
var XML11_ATTRIBUTE_REGEXP = new RegExp(XML11_ATTRIBUTE, 'g');

// Parses the given XML string with our custom, JavaScript XML parser. Written
// by Steffen Meschkat (mesch@google.com).
function xmlParse(xml) {
  var regex_empty = /\/$/;

  var regex_tagname;
  var regex_attribute;
  if (xml.match(/^<\?xml/)) {
    // When an XML document begins with an XML declaration
    // VersionInfo must appear.
    if (xml.search(new RegExp(XML10_VERSION_INFO)) == 5) {
      regex_tagname = XML10_TAGNAME_REGEXP;
      regex_attribute = XML10_ATTRIBUTE_REGEXP;
    } else if (xml.search(new RegExp(XML11_VERSION_INFO)) == 5) {
      regex_tagname = XML11_TAGNAME_REGEXP;
      regex_attribute = XML11_ATTRIBUTE_REGEXP;
    } else {
      // VersionInfo is missing, or unknown version number.
      // TODO : Fallback to XML 1.0 or XML 1.1, or just return null?
      alert('VersionInfo is missing, or unknown version number.');
    }
  } else {
    // When an XML declaration is missing it's an XML 1.0 document.
    regex_tagname = XML10_TAGNAME_REGEXP;
    regex_attribute = XML10_ATTRIBUTE_REGEXP;
  }

  var xmldoc = new XDocument();
  var root = xmldoc;

  // For the record: in Safari, we would create native DOM nodes, but
  // in Opera that is not possible, because the DOM only allows HTML
  // element nodes to be created, so we have to do our own DOM nodes.

  // xmldoc = document.implementation.createDocument('','',null);
  // root = xmldoc; // .createDocumentFragment();
  // NOTE(mesch): using the DocumentFragment instead of the Document
  // crashes my Safari 1.2.4 (v125.12).
  var stack = [];

  var parent = root;
  stack.push(parent);

  // The token that delimits a section that contains markup as
  // content: CDATA or comments.
  var slurp = '';

  var x = stringSplit(xml, '<');
  for (var i = 1; i < x.length; ++i) {
    var xx = stringSplit(x[i], '>');
    var tag = xx[0];
    var text = xmlResolveEntities(xx[1] || '');

    if (slurp) {
      // In a "slurp" section (CDATA or comment): only check for the
      // end of the section, otherwise append the whole text.
      var end = x[i].indexOf(slurp);
      if (end != -1) {
        var data = x[i].substring(0, end);
        parent.nodeValue += '<' + data;
        stack.pop();
        parent = stack[stack.length-1];
        text = x[i].substring(end + slurp.length);
        slurp = '';
      } else {
        parent.nodeValue += '<' + x[i];
        text = null;
      }

    } else if (tag.indexOf('![CDATA[') == 0) {
      var start = '![CDATA['.length;
      var end = x[i].indexOf(']]>');
      if (end != -1) {
        var data = x[i].substring(start, end);
        var node = domCreateCDATASection(xmldoc, data);
        domAppendChild(parent, node);
      } else {
        var data = x[i].substring(start);
        text = null;
        var node = domCreateCDATASection(xmldoc, data);
        domAppendChild(parent, node);
        parent = node;
        stack.push(node);
        slurp = ']]>';
      }

    } else if (tag.indexOf('!--') == 0) {
      var start = '!--'.length;
      var end = x[i].indexOf('-->');
      if (end != -1) {
        var data = x[i].substring(start, end);
        var node = domCreateComment(xmldoc, data);
        domAppendChild(parent, node);
      } else {
        var data = x[i].substring(start);
        text = null;
        var node = domCreateComment(xmldoc, data);
        domAppendChild(parent, node);
        parent = node;
        stack.push(node);
        slurp = '-->';
      }

    } else if (tag.charAt(0) == '/') {
      stack.pop();
      parent = stack[stack.length-1];

    } else if (tag.charAt(0) == '?') {
      // Ignore XML declaration and processing instructions
    } else if (tag.charAt(0) == '!') {
      // Ignore notation and comments
    } else {
      var empty = tag.match(regex_empty);
      var tagname = regex_tagname.exec(tag)[1];
      var node = domCreateElement(xmldoc, tagname);

      var att;
      while (att = regex_attribute.exec(tag)) {
        var val = xmlResolveEntities(att[5] || att[7] || '');
        domSetAttribute(node, att[1], val);
      }

      domAppendChild(parent, node);
      if (!empty) {
        parent = node;
        stack.push(node);
      }
    }

    if (text && parent != root) {
      domAppendChild(parent, domCreateTextNode(xmldoc, text));
    }
  }

  return root;
}

// Based on <http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/
// core.html#ID-1950641247>
var DOM_ELEMENT_NODE = 1;
var DOM_ATTRIBUTE_NODE = 2;
var DOM_TEXT_NODE = 3;
var DOM_CDATA_SECTION_NODE = 4;
var DOM_ENTITY_REFERENCE_NODE = 5;
var DOM_ENTITY_NODE = 6;
var DOM_PROCESSING_INSTRUCTION_NODE = 7;
var DOM_COMMENT_NODE = 8;
var DOM_DOCUMENT_NODE = 9;
var DOM_DOCUMENT_TYPE_NODE = 10;
var DOM_DOCUMENT_FRAGMENT_NODE = 11;
var DOM_NOTATION_NODE = 12;

// Traverses the element nodes in the DOM section underneath the given
// node and invokes the given callbacks as methods on every element
// node encountered. Function opt_pre is invoked before a node's
// children are traversed; opt_post is invoked after they are
// traversed. Traversal will not be continued if a callback function
// returns boolean false. NOTE(mesch): copied from
// <//google3/maps/webmaps/javascript/dom.js>.
function domTraverseElements(node, opt_pre, opt_post) {
  var ret;
  if (opt_pre) {
    ret = opt_pre.call(null, node);
    if (typeof ret == 'boolean' && !ret) {
      return false;
    }
  }

  for (var c = node.firstChild; c; c = c.nextSibling) {
    if (c.nodeType == DOM_ELEMENT_NODE) {
      ret = arguments.callee.call(this, c, opt_pre, opt_post);
      if (typeof ret == 'boolean' && !ret) {
        return false;
      }
    }
  }

  if (opt_post) {
    ret = opt_post.call(null, node);
    if (typeof ret == 'boolean' && !ret) {
      return false;
    }
  }
}

// Our W3C DOM Node implementation. Note we call it XNode because we
// can't define the identifier Node. We do this mostly for Opera,
// where we can't reuse the HTML DOM for parsing our own XML, and for
// Safari, where it is too expensive to have the template processor
// operate on native DOM nodes.
function XNode(type, name, opt_value, opt_owner) {
  this.attributes = [];
  this.childNodes = [];

  XNode.init.call(this, type, name, opt_value, opt_owner);
}

// Don't call as method, use apply() or call().
XNode.init = function(type, name, value, owner) {
  this.nodeType = type - 0;
  this.nodeName = '' + name;
  this.nodeValue = '' + value;
  this.ownerDocument = owner;

  this.firstChild = null;
  this.lastChild = null;
  this.nextSibling = null;
  this.previousSibling = null;
  this.parentNode = null;
}

XNode.unused_ = [];

XNode.recycle = function(node) {
  if (!node) {
    return;
  }

  if (node.constructor == XDocument) {
    XNode.recycle(node.documentElement);
    return;
  }

  if (node.constructor != this) {
    return;
  }

  XNode.unused_.push(node);
  for (var a = 0; a < node.attributes.length; ++a) {
    XNode.recycle(node.attributes[a]);
  }
  for (var c = 0; c < node.childNodes.length; ++c) {
    XNode.recycle(node.childNodes[c]);
  }
  node.attributes.length = 0;
  node.childNodes.length = 0;
  XNode.init.call(node, 0, '', '', null);
}

XNode.create = function(type, name, value, owner) {
  if (XNode.unused_.length > 0) {
    var node = XNode.unused_.pop();
    XNode.init.call(node, type, name, value, owner);
    return node;
  } else {
    return new XNode(type, name, value, owner);
  }
}

XNode.prototype.appendChild = function(node) {
  // firstChild
  if (this.childNodes.length == 0) {
    this.firstChild = node;
  }

  // previousSibling
  node.previousSibling = this.lastChild;

  // nextSibling
  node.nextSibling = null;
  if (this.lastChild) {
    this.lastChild.nextSibling = node;
  }

  // parentNode
  node.parentNode = this;

  // lastChild
  this.lastChild = node;

  // childNodes
  this.childNodes.push(node);
}


XNode.prototype.replaceChild = function(newNode, oldNode) {
  if (oldNode == newNode) {
    return;
  }

  for (var i = 0; i < this.childNodes.length; ++i) {
    if (this.childNodes[i] == oldNode) {
      this.childNodes[i] = newNode;

      var p = oldNode.parentNode;
      oldNode.parentNode = null;
      newNode.parentNode = p;

      p = oldNode.previousSibling;
      oldNode.previousSibling = null;
      newNode.previousSibling = p;
      if (newNode.previousSibling) {
        newNode.previousSibling.nextSibling = newNode;
      }

      p = oldNode.nextSibling;
      oldNode.nextSibling = null;
      newNode.nextSibling = p;
      if (newNode.nextSibling) {
        newNode.nextSibling.previousSibling = newNode;
      }

      if (this.firstChild == oldNode) {
        this.firstChild = newNode;
      }

      if (this.lastChild == oldNode) {
        this.lastChild = newNode;
      }

      break;
    }
  }
}


XNode.prototype.insertBefore = function(newNode, oldNode) {
  if (oldNode == newNode) {
    return;
  }

  if (oldNode.parentNode != this) {
    return;
  }

  if (newNode.parentNode) {
    newNode.parentNode.removeChild(newNode);
  }

  var newChildren = [];
  for (var i = 0; i < this.childNodes.length; ++i) {
    var c = this.childNodes[i];
    if (c == oldNode) {
      newChildren.push(newNode);

      newNode.parentNode = this;

      newNode.previousSibling = oldNode.previousSibling;
      oldNode.previousSibling = newNode;
      if (newNode.previousSibling) {
        newNode.previousSibling.nextSibling = newNode;
      }

      newNode.nextSibling = oldNode;

      if (this.firstChild == oldNode) {
        this.firstChild = newNode;
      }
    }
    newChildren.push(c);
  }
  this.childNodes = newChildren;
}


XNode.prototype.removeChild = function(node) {
  var newChildren = [];
  for (var i = 0; i < this.childNodes.length; ++i) {
    var c = this.childNodes[i];
    if (c != node) {
      newChildren.push(c);
    } else {
      if (c.previousSibling) {
        c.previousSibling.nextSibling = c.nextSibling;
      }
      if (c.nextSibling) {
        c.nextSibling.previousSibling = c.previousSibling;
      }
      if (this.firstChild == c) {
        this.firstChild = c.nextSibling;
      }
      if (this.lastChild == c) {
        this.lastChild = c.previousSibling;
      }
    }
  }
  this.childNodes = newChildren;
}


XNode.prototype.hasAttributes = function() {
  return this.attributes.length > 0;
}


XNode.prototype.setAttribute = function(name, value) {
  for (var i = 0; i < this.attributes.length; ++i) {
    if (this.attributes[i].nodeName == name) {
      this.attributes[i].nodeValue = '' + value;
      return;
    }
  }
  this.attributes.push(XNode.create(DOM_ATTRIBUTE_NODE, name, value, this));
}


XNode.prototype.getAttribute = function(name) {
  for (var i = 0; i < this.attributes.length; ++i) {
    if (this.attributes[i].nodeName == name) {
      return this.attributes[i].nodeValue;
    }
  }
  return null;
}


XNode.prototype.removeAttribute = function(name) {
  var a = [];
  for (var i = 0; i < this.attributes.length; ++i) {
    if (this.attributes[i].nodeName != name) {
      a.push(this.attributes[i]);
    }
  }
  this.attributes = a;
}


XNode.prototype.getElementsByTagName = function(name) {
  var ret = [];
  var self = this;
  if ("*" == name) {
    domTraverseElements(this, function(node) {
      if (self == node) return;
      ret.push(node);
    }, null);
  } else {
    domTraverseElements(this, function(node) {
      if (self == node) return;
      if (node.nodeName == name) {
        ret.push(node);
      }
    }, null);
  }
  return ret;
}


XNode.prototype.getElementById = function(id) {
  var ret = null;
  domTraverseElements(this, function(node) {
    if (node.getAttribute('id') == id) {
      ret = node;
      return false;
    }
  }, null);
  return ret;
}


function XDocument() {
  // NOTE(mesch): Acocording to the DOM Spec, ownerDocument of a
  // document node is null.
  XNode.call(this, DOM_DOCUMENT_NODE, '#document', null, null);
  this.documentElement = null;
}

XDocument.prototype = new XNode(DOM_DOCUMENT_NODE, '#document');

XDocument.prototype.clear = function() {
  XNode.recycle(this.documentElement);
  this.documentElement = null;
}

XDocument.prototype.appendChild = function(node) {
  XNode.prototype.appendChild.call(this, node);
  this.documentElement = this.childNodes[0];
}

XDocument.prototype.createElement = function(name) {
  return XNode.create(DOM_ELEMENT_NODE, name, null, this);
}

XDocument.prototype.createDocumentFragment = function() {
  return XNode.create(DOM_DOCUMENT_FRAGMENT_NODE, '#document-fragment',
                    null, this);
}

XDocument.prototype.createTextNode = function(value) {
  return XNode.create(DOM_TEXT_NODE, '#text', value, this);
}

XDocument.prototype.createAttribute = function(name) {
  return XNode.create(DOM_ATTRIBUTE_NODE, name, null, this);
}

XDocument.prototype.createComment = function(data) {
  return XNode.create(DOM_COMMENT_NODE, '#comment', data, this);
}

XDocument.prototype.createCDATASection = function(data) {
  return XNode.create(DOM_CDATA_SECTION_NODE, '#cdata-section', data, this);
}
// Copyright 2005 Google
//
// Author: Steffen Meschkat <mesch@google.com>
//
// Miscellaneous utility and placeholder functions.

// Dummy implmentation for the logging functions. Replace by something
// useful when you want to debug.
function xpathLog(msg) {};
function xsltLog(msg) {};
function xsltLogXml(msg) {};

var ajaxsltIsIE6 = navigator.appVersion.match(/MSIE 6.0/);

// Throws an exception if false.
function assert(b) {
  if (!b) {
    throw "Assertion failed";
  }
}

// Splits a string s at all occurrences of character c. This is like
// the split() method of the string object, but IE omits empty
// strings, which violates the invariant (s.split(x).join(x) == s).
function stringSplit(s, c) {
  var a = s.indexOf(c);
  if (a == -1) {
    return [ s ];
  }
  var parts = [];
  parts.push(s.substr(0,a));
  while (a != -1) {
    var a1 = s.indexOf(c, a + 1);
    if (a1 != -1) {
      parts.push(s.substr(a + 1, a1 - a - 1));
    } else {
      parts.push(s.substr(a + 1));
    }
    a = a1;
  }
  return parts;
}

// The following function does what document.importNode(node, true)
// would do for us here; however that method is broken in Safari/1.3,
// so we have to emulate it.
function xmlImportNode(doc, node) {
  if (node.nodeType == DOM_TEXT_NODE) {
    return domCreateTextNode(doc, node.nodeValue);

  } else if (node.nodeType == DOM_CDATA_SECTION_NODE) {
    return domCreateCDATASection(doc, node.nodeValue);

  } else if (node.nodeType == DOM_ELEMENT_NODE) {
    var newNode = domCreateElement(doc, node.nodeName);
    for (var i = 0; i < node.attributes.length; ++i) {
      var an = node.attributes[i];
      var name = an.nodeName;
      var value = an.nodeValue;
      domSetAttribute(newNode, name, value);
    }

    for (var c = node.firstChild; c; c = c.nextSibling) {
      var cn = arguments.callee(doc, c);
      domAppendChild(newNode, cn);
    }

    return newNode;

  } else {
    return domCreateComment(doc, node.nodeName);
  }
}

// A set data structure. It can also be used as a map (i.e. the keys
// can have values other than 1), but we don't call it map because it
// would be ambiguous in this context. Also, the map is iterable, so
// we can use it to replace for-in loops over core javascript Objects.
// For-in iteration breaks when Object.prototype is modified, which
// some clients of the maps API do.
//
// NOTE(mesch): The set keys by the string value of its element, NOT
// by the typed value. In particular, objects can't be used as keys.
//
// @constructor
function Set() {
  this.keys = [];
}

Set.prototype.size = function() {
  return this.keys.length;
}

// Adds the entry to the set, ignoring if it is present.
Set.prototype.add = function(key, opt_value) {
  var value = opt_value || 1;
  if (!this.contains(key)) {
    this[':' + key] = value;
    this.keys.push(key);
  }
}

// Sets the entry in the set, adding if it is not yet present.
Set.prototype.set = function(key, opt_value) {
  var value = opt_value || 1;
  if (!this.contains(key)) {
    this[':' + key] = value;
    this.keys.push(key);
  } else {
    this[':' + key] = value;
  }
}

// Increments the key's value by 1. This works around the fact that
// numbers are always passed by value, never by reference, so that we
// can't increment the value returned by get(), or the iterator
// argument. Sets the key's value to 1 if it doesn't exist yet.
Set.prototype.inc = function(key) {
  if (!this.contains(key)) {
    this[':' + key] = 1;
    this.keys.push(key);
  } else {
    this[':' + key]++;
  }
}

Set.prototype.get = function(key) {
  if (this.contains(key)) {
    return this[':' + key];
  } else {
    var undefined;
    return undefined;
  }
}

// Removes the entry from the set.
Set.prototype.remove = function(key) {
  if (this.contains(key)) {
    delete this[':' + key];
    removeFromArray(this.keys, key, true);
  }
}

// Tests if an entry is in the set.
Set.prototype.contains = function(entry) {
  return typeof this[':' + entry] != 'undefined';
}

// Gets a list of values in the set.
Set.prototype.items = function() {
  var list = [];
  for (var i = 0; i < this.keys.length; ++i) {
    var k = this.keys[i];
    var v = this[':' + k];
    list.push(v);
  }
  return list;
}


// Invokes function f for every key value pair in the set as a method
// of the set.
Set.prototype.map = function(f) {
  for (var i = 0; i < this.keys.length; ++i) {
    var k = this.keys[i];
    f.call(this, k, this[':' + k]);
  }
}

Set.prototype.clear = function() {
  for (var i = 0; i < this.keys.length; ++i) {
    delete this[':' + this.keys[i]];
  }
  this.keys.length = 0;
}


// Applies the given function to each element of the array, preserving
// this, and passing the index.
function mapExec(array, func) {
  for (var i = 0; i < array.length; ++i) {
    func.call(this, array[i], i);
  }
}

// Returns an array that contains the return value of the given
// function applied to every element of the input array.
function mapExpr(array, func) {
  var ret = [];
  for (var i = 0; i < array.length; ++i) {
    ret.push(func(array[i]));
  }
  return ret;
};

// Reverses the given array in place.
function reverseInplace(array) {
  for (var i = 0; i < array.length / 2; ++i) {
    var h = array[i];
    var ii = array.length - i - 1;
    array[i] = array[ii];
    array[ii] = h;
  }
}

// Removes value from array. Returns the number of instances of value
// that were removed from array.
function removeFromArray(array, value, opt_notype) {
  var shift = 0;
  for (var i = 0; i < array.length; ++i) {
    if (array[i] === value || (opt_notype && array[i] == value)) {
      array.splice(i--, 1);
      shift++;
    }
  }
  return shift;
}

// Shallow-copies an array to the end of another array
// Basically Array.concat, but works with other non-array collections
function copyArray(dst, src) {
  if (!src) return;
  var dstLength = dst.length;
  for (var i = src.length - 1; i >= 0; --i) {
    dst[i+dstLength] = src[i];
  }
}

/**
 * This is an optimization for copying attribute lists in IE. IE includes many
 * extraneous properties in its DOM attribute lists, which take require
 * significant extra processing when evaluating attribute steps. With this
 * function, we ignore any such attributes that has an empty string value.
 */
function copyArrayIgnoringAttributesWithoutValue(dst, src)
{
  if (!src) return;
  for (var i = src.length - 1; i >= 0; --i) {
    // this test will pass so long as the attribute has a non-empty string
    // value, even if that value is "false", "0", "undefined", etc.
    if (src[i].nodeValue) {
      dst.push(src[i]);
    }
  }
}

// Returns the text value of a node; for nodes without children this
// is the nodeValue, for nodes with children this is the concatenation
// of the value of all children. Browser-specific optimizations are used by
// default; they can be disabled by passing "true" in as the second parameter.
function xmlValue(node, disallowBrowserSpecificOptimization) {
  if (!node) {
    return '';
  }

  var ret = '';
  if (node.nodeType == DOM_TEXT_NODE ||
      node.nodeType == DOM_CDATA_SECTION_NODE) {
    ret += node.nodeValue;

  } else if (node.nodeType == DOM_ATTRIBUTE_NODE) {
    if (ajaxsltIsIE6) {
      ret += xmlValueIE6Hack(node);
    } else {
      ret += node.nodeValue;
    }
  } else if (node.nodeType == DOM_ELEMENT_NODE ||
             node.nodeType == DOM_DOCUMENT_NODE ||
             node.nodeType == DOM_DOCUMENT_FRAGMENT_NODE) {
    if (!disallowBrowserSpecificOptimization) {
      // IE, Safari, Opera, and friends
      var innerText = node.innerText;
      if (innerText != undefined) {
        return innerText;
      }
      // Firefox
      var textContent = node.textContent;
      if (textContent != undefined) {
        return textContent;
      }
    }
    // pobrecito!
    var len = node.childNodes.length;
    for (var i = 0; i < len; ++i) {
      ret += arguments.callee(node.childNodes[i]);
    }
  }
  return ret;
}

function xmlValueIE6Hack(node) {
    // Issue 19, IE6 mangles href attribute when it's a javascript: url
    var nodeName = node.nodeName;
    var nodeValue = node.nodeValue;
    if (nodeName.length != 4) return nodeValue;
    if (!/^href$/i.test(nodeName)) return nodeValue;
    if (!/^javascript:/.test(nodeValue)) return nodeValue;
    return unescape(nodeValue);
}

// Returns the representation of a node as XML text.
function xmlText(node, opt_cdata) {
  var buf = [];
  xmlTextR(node, buf, opt_cdata);
  return buf.join('');
}

function xmlTextR(node, buf, cdata) {
  if (node.nodeType == DOM_TEXT_NODE) {
    buf.push(xmlEscapeText(node.nodeValue));

  } else if (node.nodeType == DOM_CDATA_SECTION_NODE) {
    if (cdata) {
      buf.push(node.nodeValue);
    } else {
      buf.push('<![CDATA[' + node.nodeValue + ']]>');
    }

  } else if (node.nodeType == DOM_COMMENT_NODE) {
    buf.push('<!--' + node.nodeValue + '-->');

  } else if (node.nodeType == DOM_ELEMENT_NODE) {
    buf.push('<' + xmlFullNodeName(node));
    for (var i = 0; i < node.attributes.length; ++i) {
      var a = node.attributes[i];
      if (a && a.nodeName && a.nodeValue) {
        buf.push(' ' + xmlFullNodeName(a) + '="' +
                 xmlEscapeAttr(a.nodeValue) + '"');
      }
    }

    if (node.childNodes.length == 0) {
      buf.push('/>');
    } else {
      buf.push('>');
      for (var i = 0; i < node.childNodes.length; ++i) {
        arguments.callee(node.childNodes[i], buf, cdata);
      }
      buf.push('</' + xmlFullNodeName(node) + '>');
    }

  } else if (node.nodeType == DOM_DOCUMENT_NODE ||
             node.nodeType == DOM_DOCUMENT_FRAGMENT_NODE) {
    for (var i = 0; i < node.childNodes.length; ++i) {
      arguments.callee(node.childNodes[i], buf, cdata);
    }
  }
}

function xmlFullNodeName(n) {
  if (n.prefix && n.nodeName.indexOf(n.prefix + ':') != 0) {
    return n.prefix + ':' + n.nodeName;
  } else {
    return n.nodeName;
  }
}

// Escape XML special markup chracters: tag delimiter < > and entity
// reference start delimiter &. The escaped string can be used in XML
// text portions (i.e. between tags).
function xmlEscapeText(s) {
  return ('' + s).replace(/&/g, '&amp;').replace(/</g, '&lt;').
    replace(/>/g, '&gt;');
}

// Escape XML special markup characters: tag delimiter < > entity
// reference start delimiter & and quotes ". The escaped string can be
// used in double quoted XML attribute value portions (i.e. in
// attributes within start tags).
function xmlEscapeAttr(s) {
  return xmlEscapeText(s).replace(/\"/g, '&quot;');
}

// Escape markup in XML text, but don't touch entity references. The
// escaped string can be used as XML text (i.e. between tags).
function xmlEscapeTags(s) {
  return s.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Wrapper function to access the owner document uniformly for document
 * and other nodes: for the document node, the owner document is the
 * node itself, for all others it's the ownerDocument property.
 *
 * @param {Node} node
 * @return {Document}
 */
function xmlOwnerDocument(node) {
  if (node.nodeType == DOM_DOCUMENT_NODE) {
    return node;
  } else {
    return node.ownerDocument;
  }
}

// Wrapper around DOM methods so we can condense their invocations.
function domGetAttribute(node, name) {
  return node.getAttribute(name);
}

function domSetAttribute(node, name, value) {
  return node.setAttribute(name, value);
}

function domRemoveAttribute(node, name) {
  return node.removeAttribute(name);
}

function domAppendChild(node, child) {
  return node.appendChild(child);
}

function domRemoveChild(node, child) {
  return node.removeChild(child);
}

function domReplaceChild(node, newChild, oldChild) {
  return node.replaceChild(newChild, oldChild);
}

function domInsertBefore(node, newChild, oldChild) {
  return node.insertBefore(newChild, oldChild);
}

function domRemoveNode(node) {
  return domRemoveChild(node.parentNode, node);
}

function domCreateTextNode(doc, text) {
  return doc.createTextNode(text);
}

function domCreateElement(doc, name) {
  return doc.createElement(name);
}

function domCreateAttribute(doc, name) {
  return doc.createAttribute(name);
}

function domCreateCDATASection(doc, data) {
  return doc.createCDATASection(data);
}

function domCreateComment(doc, text) {
  return doc.createComment(text);
}

function domCreateDocumentFragment(doc) {
  return doc.createDocumentFragment();
}

function domGetElementById(doc, id) {
  return doc.getElementById(id);
}

// Same for window methods.
function windowSetInterval(win, fun, time) {
  return win.setInterval(fun, time);
}

function windowClearInterval(win, id) {
  return win.clearInterval(id);
}

/**
 * Escape the special regular expression characters when the regular expression
 * is specified as a string.
 *
 * Based on: http://simonwillison.net/2006/Jan/20/escape/
 */
RegExp.escape = (function() {
  var specials = [
    '/', '.', '*', '+', '?', '|', '^', '$',
    '(', ')', '[', ']', '{', '}', '\\'
  ];
    
  var sRE = new RegExp(
    '(\\' + specials.join('|\\') + ')', 'g'
  );
    
  return function(text) {
    return text.replace(sRE, '\\$1');
  }
})();

/**
 * Determines whether a predicate expression contains a "positional selector".
 * A positional selector filters nodes from the nodelist input based on their
 * position within that list. When such selectors are encountered, the
 * evaluation of the predicate cannot be depth-first, because the positional
 * selector may be based on the result of evaluating predicates that precede
 * it.
 */
function predicateExprHasPositionalSelector(expr, isRecursiveCall) {
  if (!expr) {
    return false;
  }
  if (!isRecursiveCall && exprReturnsNumberValue(expr)) {
    // this is a "proximity position"-based predicate
    return true;
  }
  if (expr instanceof FunctionCallExpr) {
    var value = expr.name.value;
    return (value == 'last' || value == 'position');
  }
  if (expr instanceof BinaryExpr) {
    return (
      predicateExprHasPositionalSelector(expr.expr1, true) ||
      predicateExprHasPositionalSelector(expr.expr2, true));
  }
  return false;
}

function exprReturnsNumberValue(expr) {
  if (expr instanceof FunctionCallExpr) {
    var isMember = {
      last: true
      , position: true
      , count: true
      , 'string-length': true
      , number: true
      , sum: true
      , floor: true
      , ceiling: true
      , round: true
    };
    return isMember[expr.name.value];
  }
  else if (expr instanceof UnaryMinusExpr) {
    return true;
  }
  else if (expr instanceof BinaryExpr) {
    var isMember = {
      '+': true
      , '-': true
      , '*': true
      , mod: true
      , div: true
    };
    return isMember[expr.op.value];
  }
  else if (expr instanceof NumberExpr) {
    return true;
  }
  return false;
}


/*
 * Copyright 2004 ThoughtWorks, Inc
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

// This script contains a badly-organised collection of miscellaneous
// functions that really better homes.

function classCreate() {
    return function() {
      this.initialize.apply(this, arguments);
    }
}

function objectExtend(destination, source) {
  for (var property in source) {
    destination[property] = source[property];
  }
  return destination;
}

function sel$() {
  var results = [], element;
  for (var i = 0; i < arguments.length; i++) {
    element = arguments[i];
    if (typeof element == 'string')
      element = document.getElementById(element);
    results[results.length] = element;
  }
  return results.length < 2 ? results[0] : results;
}

function sel$A(iterable) {
  if (!iterable) return [];
  if (iterable.toArray) {
    return iterable.toArray();
  } else {
    var results = [];
    for (var i = 0; i < iterable.length; i++)
      results.push(iterable[i]);
    return results;
  }
}

function fnBind() {
  var args = sel$A(arguments), __method = args.shift(), object = args.shift();
  var retval = function() {
    return __method.apply(object, args.concat(sel$A(arguments)));
  }
  retval.__method = __method;
  return retval;
}

function fnBindAsEventListener(fn, object) {
  var __method = fn;
  return function(event) {
    return __method.call(object, event || window.event);
  }
}

function removeClassName(element, name) {
    var re = new RegExp("\\b" + name + "\\b", "g");
    element.className = element.className.replace(re, "");
}

function addClassName(element, name) {
    element.className = element.className + ' ' + name;
}

function elementSetStyle(element, style) {
    for (var name in style) {
      var value = style[name];
      if (value == null) value = "";
      element.style[name] = value;
    }
}

function elementGetStyle(element, style) {
    var value = element.style[style];
    if (!value) {
      if (document.defaultView && document.defaultView.getComputedStyle) {
        var css = document.defaultView.getComputedStyle(element, null);
        value = css ? css.getPropertyValue(style) : null;
      } else if (element.currentStyle) {
        value = element.currentStyle[style];
      }
    }

    /** DGF necessary? 
    if (window.opera && ['left', 'top', 'right', 'bottom'].include(style))
      if (Element.getStyle(element, 'position') == 'static') value = 'auto'; */

    return value == 'auto' ? null : value;
  }

String.prototype.trim = function() {
    var result = this.replace(/^\s+/g, "");
    // strip leading
    return result.replace(/\s+$/g, "");
    // strip trailing
};
String.prototype.lcfirst = function() {
    return this.charAt(0).toLowerCase() + this.substr(1);
};
String.prototype.ucfirst = function() {
    return this.charAt(0).toUpperCase() + this.substr(1);
};
String.prototype.startsWith = function(str) {
    return this.indexOf(str) == 0;
};

/**
 * Given a string literal that would appear in an XPath, puts it in quotes and
 * returns it. Special consideration is given to literals who themselves
 * contain quotes. It's possible for a concat() expression to be returned.
 */
String.prototype.quoteForXPath = function()
{
    if (/\'/.test(this)) {
        if (/\"/.test(this)) {
            // concat scenario
            var pieces = [];
            var a = "'", b = '"', c;
            for (var i = 0, j = 0; i < this.length;) {
                if (this.charAt(i) == a) {
                    // encountered a quote that cannot be contained in current
                    // quote, so need to flip-flop quoting scheme
                    if (j < i) {
                        pieces.push(a + this.substring(j, i) + a);
                        j = i;
                    }
                    c = a;
                    a = b;
                    b = c;
                }
                else {
                    ++i;
                }
            }
            pieces.push(a + this.substring(j) + a);
            return 'concat(' + pieces.join(', ') + ')';
        }
        else {
            // quote with doubles
            return '"' + this + '"';
        }
    }
    // quote with singles
    return "'" + this + "'";
};

// Returns the text in this element
function getText(element) {
    var text = "";

    var isRecentFirefox = (browserVersion.isFirefox && browserVersion.firefoxVersion >= "1.5");
    if (isRecentFirefox || browserVersion.isKonqueror || browserVersion.isSafari || browserVersion.isOpera) {
        text = getTextContent(element);
    } else if (element.textContent) {
        text = element.textContent;
    } else if (element.innerText) {
        text = element.innerText;
    }

    text = normalizeNewlines(text);
    text = normalizeSpaces(text);

    return text.trim();
}

function getTextContent(element, preformatted) {
    if (element.style && (element.style.visibility == 'hidden' || element.style.display == 'none')) return '';
    if (element.nodeType == 3 /*Node.TEXT_NODE*/) {
        var text = element.data;
        if (!preformatted) {
            text = text.replace(/\n|\r|\t/g, " ");
        }
        return text;
    }
    if (element.nodeType == 1 /*Node.ELEMENT_NODE*/ && element.nodeName != 'SCRIPT') {
        var childrenPreformatted = preformatted || (element.tagName == "PRE");
        var text = "";
        for (var i = 0; i < element.childNodes.length; i++) {
            var child = element.childNodes.item(i);
            text += getTextContent(child, childrenPreformatted);
        }
        // Handle block elements that introduce newlines
        // -- From HTML spec:
        //<!ENTITY % block
        //     "P | %heading; | %list; | %preformatted; | DL | DIV | NOSCRIPT |
        //      BLOCKQUOTE | F:wORM | HR | TABLE | FIELDSET | ADDRESS">
        //
        // TODO: should potentially introduce multiple newlines to separate blocks
        if (element.tagName == "P" || element.tagName == "BR" || element.tagName == "HR" || element.tagName == "DIV") {
            text += "\n";
        }
        return text;
    }
    return '';
}

/**
 * Convert all newlines to \n
 */
function normalizeNewlines(text)
{
    return text.replace(/\r\n|\r/g, "\n");
}

/**
 * Replace multiple sequential spaces with a single space, and then convert &nbsp; to space.
 */
function normalizeSpaces(text)
{
    // IE has already done this conversion, so doing it again will remove multiple nbsp
    if (browserVersion.isIE)
    {
        return text;
    }

    // Replace multiple spaces with a single space
    // TODO - this shouldn't occur inside PRE elements
    text = text.replace(/\ +/g, " ");

    // Replace &nbsp; with a space
    var nbspPattern = new RegExp(String.fromCharCode(160), "g");
    if (browserVersion.isSafari) {
	return replaceAll(text, String.fromCharCode(160), " ");
    } else {
	return text.replace(nbspPattern, " ");
    }
}

function replaceAll(text, oldText, newText) {
    while (text.indexOf(oldText) != -1) {
	text = text.replace(oldText, newText);
    }
    return text;
}


function xmlDecode(text) {
    text = text.replace(/&quot;/g, '"');
    text = text.replace(/&apos;/g, "'");
    text = text.replace(/&lt;/g, "<");
    text = text.replace(/&gt;/g, ">");
    text = text.replace(/&amp;/g, "&");
    return text;
}

// Sets the text in this element
function setText(element, text) {
    if (element.textContent != null) {
        element.textContent = text;
    } else if (element.innerText != null) {
        element.innerText = text;
    }
}

// Get the value of an <input> element
function getInputValue(inputElement) {
    if (inputElement.type) {
        if (inputElement.type.toUpperCase() == 'CHECKBOX' ||
            inputElement.type.toUpperCase() == 'RADIO')
        {
            return (inputElement.checked ? 'on' : 'off');
        }
    }
    if (inputElement.value == null) {
        throw new SeleniumError("This element has no value; is it really a form field?");
    }
    return inputElement.value;
}

/* Fire an event in a browser-compatible manner */
function triggerEvent(element, eventType, canBubble, controlKeyDown, altKeyDown, shiftKeyDown, metaKeyDown) {
    canBubble = (typeof(canBubble) == undefined) ? true : canBubble;
    if (element.fireEvent && element.ownerDocument && element.ownerDocument.createEventObject) { // IE
        var evt = createEventObject(element, controlKeyDown, altKeyDown, shiftKeyDown, metaKeyDown);        
        element.fireEvent('on' + eventType, evt);
    }
    else {
        var evt = document.createEvent('HTMLEvents');
        
        try {
            evt.shiftKey = shiftKeyDown;
            evt.metaKey = metaKeyDown;
            evt.altKey = altKeyDown;
            evt.ctrlKey = controlKeyDown;
        } catch (e) {
            // On Firefox 1.0, you can only set these during initMouseEvent or initKeyEvent
            // we'll have to ignore them here
            LOG.exception(e);
        }
        
        evt.initEvent(eventType, canBubble, true);
        element.dispatchEvent(evt);
    }
}

function getKeyCodeFromKeySequence(keySequence) {
    var match = /^\\(\d{1,3})$/.exec(keySequence);
    if (match != null) {
        return match[1];
    }
    match = /^.$/.exec(keySequence);
    if (match != null) {
        return match[0].charCodeAt(0);
    }
    // this is for backward compatibility with existing tests
    // 1 digit ascii codes will break however because they are used for the digit chars
    match = /^\d{2,3}$/.exec(keySequence);
    if (match != null) {
        return match[0];
    }
    throw new SeleniumError("invalid keySequence");
}

function createEventObject(element, controlKeyDown, altKeyDown, shiftKeyDown, metaKeyDown) {
     var evt = element.ownerDocument.createEventObject();
     evt.shiftKey = shiftKeyDown;
     evt.metaKey = metaKeyDown;
     evt.altKey = altKeyDown;
     evt.ctrlKey = controlKeyDown;
     return evt;
}

function triggerKeyEvent(element, eventType, keySequence, canBubble, controlKeyDown, altKeyDown, shiftKeyDown, metaKeyDown) {
    var keycode = getKeyCodeFromKeySequence(keySequence);
    canBubble = (typeof(canBubble) == undefined) ? true : canBubble;
    if (element.fireEvent && element.ownerDocument && element.ownerDocument.createEventObject) { // IE
        var keyEvent = createEventObject(element, controlKeyDown, altKeyDown, shiftKeyDown, metaKeyDown);
        keyEvent.keyCode = keycode;
        element.fireEvent('on' + eventType, keyEvent);
    }
    else {
        var evt;
        if (window.KeyEvent) {
            evt = document.createEvent('KeyEvents');
            evt.initKeyEvent(eventType, true, true, window, controlKeyDown, altKeyDown, shiftKeyDown, metaKeyDown, keycode, keycode);
        } else {
            evt = document.createEvent('UIEvents');
            
            evt.shiftKey = shiftKeyDown;
            evt.metaKey = metaKeyDown;
            evt.altKey = altKeyDown;
            evt.ctrlKey = controlKeyDown;

            evt.initUIEvent(eventType, true, true, window, 1);
            evt.keyCode = keycode;
            evt.which = keycode;
        }

        element.dispatchEvent(evt);
    }
}

function removeLoadListener(element, command) {
    LOG.debug('Removing loadListenter for ' + element + ', ' + command);
    if (window.removeEventListener)
        element.removeEventListener("load", command, true);
    else if (window.detachEvent)
        element.detachEvent("onload", command);
}

function addLoadListener(element, command) {
    LOG.debug('Adding loadListenter for ' + element + ', ' + command);
    var augmentedCommand = function() {
        command.call(this, element);
    }
    if (window.addEventListener && !browserVersion.isOpera)
        element.addEventListener("load", augmentedCommand, true);
    else if (window.attachEvent)
        element.attachEvent("onload", augmentedCommand);
}

/**
 * Override the broken getFunctionName() method from JsUnit
 * This file must be loaded _after_ the jsunitCore.js
 */
function getFunctionName(aFunction) {
    var regexpResult = aFunction.toString().match(/function (\w*)/);
    if (regexpResult && regexpResult[1]) {
        return regexpResult[1];
    }
    return 'anonymous';
}

function getDocumentBase(doc) {
    var bases = document.getElementsByTagName("base");
    if (bases && bases.length && bases[0].href) {
        return bases[0].href;
    }
    return "";
}

function getTagName(element) {
    var tagName;
    if (element && element.tagName && element.tagName.toLowerCase) {
        tagName = element.tagName.toLowerCase();
    }
    return tagName;
}

function selArrayToString(a) {
    if (isArray(a)) {
        // DGF copying the array, because the array-like object may be a non-modifiable nodelist
        var retval = [];
        for (var i = 0; i < a.length; i++) {
            var item = a[i];
            var replaced = new String(item).replace(/([,\\])/g, '\\$1');
            retval[i] = replaced;
        }
        return retval;
    }
    return new String(a);
}


function isArray(x) {
    return ((typeof x) == "object") && (x["length"] != null);
}

function absolutify(url, baseUrl) {
    /** returns a relative url in its absolute form, given by baseUrl.
    * 
    * This function is a little odd, because it can take baseUrls that
    * aren't necessarily directories.  It uses the same rules as the HTML 
    * &lt;base&gt; tag; if the baseUrl doesn't end with "/", we'll assume
    * that it points to a file, and strip the filename off to find its
    * base directory.
    *
    * So absolutify("foo", "http://x/bar") will return "http://x/foo" (stripping off bar),
    * whereas absolutify("foo", "http://x/bar/") will return "http://x/bar/foo" (preserving bar).
    * Naturally absolutify("foo", "http://x") will return "http://x/foo", appropriately.
    * 
    * @param url the url to make absolute; if this url is already absolute, we'll just return that, unchanged
    * @param baseUrl the baseUrl from which we'll absolutify, following the rules above.
    * @return 'url' if it was already absolute, or the absolutized version of url if it was not absolute.
    */
    
    // DGF isn't there some library we could use for this?
        
    if (/^\w+:/.test(url)) {
        // it's already absolute
        return url;
    }
    
    var loc;
    try {
        loc = parseUrl(baseUrl);
    } catch (e) {
        // is it an absolute windows file path? let's play the hero in that case
        if (/^\w:\\/.test(baseUrl)) {
            baseUrl = "file:///" + baseUrl.replace(/\\/g, "/");
            loc = parseUrl(baseUrl);
        } else {
            throw new SeleniumError("baseUrl wasn't absolute: " + baseUrl);
        }
    }
    loc.search = null;
    loc.hash = null;
    
    // if url begins with /, then that's the whole pathname
    if (/^\//.test(url)) {
        loc.pathname = url;
        var result = reassembleLocation(loc);
        return result;
    }
    
    // if pathname is null, then we'll just append "/" + the url
    if (!loc.pathname) {
        loc.pathname = "/" + url;
        var result = reassembleLocation(loc);
        return result;
    }
    
    // if pathname ends with /, just append url
    if (/\/$/.test(loc.pathname)) {
        loc.pathname += url;
        var result = reassembleLocation(loc);
        return result;
    }
    
    // if we're here, then the baseUrl has a pathname, but it doesn't end with /
    // in that case, we replace everything after the final / with the relative url
    loc.pathname = loc.pathname.replace(/[^\/\\]+$/, url);
    var result = reassembleLocation(loc);
    return result;
    
}

var URL_REGEX = /^((\w+):\/\/)(([^:]+):?([^@]+)?@)?([^\/\?:]*):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(.+)?/;

function parseUrl(url) {
    var fields = ['url', null, 'protocol', null, 'username', 'password', 'host', 'port', 'pathname', 'search', 'hash'];
    var result = URL_REGEX.exec(url);
    if (!result) {
        throw new SeleniumError("Invalid URL: " + url);
    }
    var loc = new Object();
    for (var i = 0; i < fields.length; i++) {
        var field = fields[i];
        if (field == null) {
            continue;
        }
        loc[field] = result[i];
    }
    return loc;
}

function reassembleLocation(loc) {
    if (!loc.protocol) {
        throw new Error("Not a valid location object: " + o2s(loc));
    }
    var protocol = loc.protocol;
    protocol = protocol.replace(/:$/, "");
    var url = protocol + "://";
    if (loc.username) {
        url += loc.username;
        if (loc.password) {
            url += ":" + loc.password;
        }
        url += "@";
    }
    if (loc.host) {
        url += loc.host;
    }
    
    if (loc.port) {
        url += ":" + loc.port;
    }
    
    if (loc.pathname) {
        url += loc.pathname;
    }
    
    if (loc.search) {
        url += "?" + loc.search;
    }
    if (loc.hash) {
        var hash = loc.hash;
        hash = loc.hash.replace(/^#/, "");
        url += "#" + hash;
    }
    return url;
}

function canonicalize(url) {
    if(url == "about:blank")
    {
	return url;
    }
    var tempLink = window.document.createElement("link");
    tempLink.href = url; // this will canonicalize the href on most browsers
    var loc = parseUrl(tempLink.href)
    if (!/\/\.\.\//.test(loc.pathname)) {
    	return tempLink.href;
    }
  	// didn't work... let's try it the hard way
  	var originalParts = loc.pathname.split("/");
  	var newParts = [];
  	newParts.push(originalParts.shift());
  	for (var i = 0; i < originalParts.length; i++) {
  		var part = originalParts[i];
  		if (".." == part) {
  			newParts.pop();
  			continue;
  		}
  		newParts.push(part);
  	}
  	loc.pathname = newParts.join("/");
    return reassembleLocation(loc);
}

function extractExceptionMessage(ex) {
    if (ex == null) return "null exception";
    if (ex.message != null) return ex.message;
    if (ex.toString && ex.toString() != null) return ex.toString();
}
    

function describe(object, delimiter) {
    var props = new Array();
    for (var prop in object) {
        try {
            props.push(prop + " -> " + object[prop]);
        } catch (e) {
            props.push(prop + " -> [htmlutils: ack! couldn't read this property! (Permission Denied?)]");
        }
    }
    return props.join(delimiter || '\n');
}

var PatternMatcher = function(pattern) {
    this.selectStrategy(pattern);
};
PatternMatcher.prototype = {

    selectStrategy: function(pattern) {
        this.pattern = pattern;
        var strategyName = 'glob';
        // by default
        if (/^([a-z-]+):(.*)/.test(pattern)) {
            var possibleNewStrategyName = RegExp.$1;
            var possibleNewPattern = RegExp.$2;
            if (PatternMatcher.strategies[possibleNewStrategyName]) {
                strategyName = possibleNewStrategyName;
                pattern = possibleNewPattern;
            }
        }
        var matchStrategy = PatternMatcher.strategies[strategyName];
        if (!matchStrategy) {
            throw new SeleniumError("cannot find PatternMatcher.strategies." + strategyName);
        }
        this.strategy = matchStrategy;
        this.matcher = new matchStrategy(pattern);
    },

    matches: function(actual) {
        return this.matcher.matches(actual + '');
        // Note: appending an empty string avoids a Konqueror bug
    }

};

/**
 * A "static" convenience method for easy matching
 */
PatternMatcher.matches = function(pattern, actual) {
    return new PatternMatcher(pattern).matches(actual);
};

PatternMatcher.strategies = {

/**
 * Exact matching, e.g. "exact:***"
 */
    exact: function(expected) {
        this.expected = expected;
        this.matches = function(actual) {
            return actual == this.expected;
        };
    },

/**
 * Match by regular expression, e.g. "regexp:^[0-9]+$"
 */
    regexp: function(regexpString) {
        this.regexp = new RegExp(regexpString);
        this.matches = function(actual) {
            return this.regexp.test(actual);
        };
    },

    regex: function(regexpString) {
        this.regexp = new RegExp(regexpString);
        this.matches = function(actual) {
            return this.regexp.test(actual);
        };
    },
    
    regexpi: function(regexpString) {
        this.regexp = new RegExp(regexpString, "i");
        this.matches = function(actual) {
            return this.regexp.test(actual);
        };
    },

    regexi: function(regexpString) {
        this.regexp = new RegExp(regexpString, "i");
        this.matches = function(actual) {
            return this.regexp.test(actual);
        };
    },

/**
 * "globContains" (aka "wildmat") patterns, e.g. "glob:one,two,*",
 * but don't require a perfect match; instead succeed if actual
 * contains something that matches globString.
 * Making this distinction is motivated by a bug in IE6 which
 * leads to the browser hanging if we implement *TextPresent tests
 * by just matching against a regular expression beginning and
 * ending with ".*".  The globcontains strategy allows us to satisfy
 * the functional needs of the *TextPresent ops more efficiently
 * and so avoid running into this IE6 freeze.
 */
    globContains: function(globString) {
        this.regexp = new RegExp(PatternMatcher.regexpFromGlobContains(globString));
        this.matches = function(actual) {
            return this.regexp.test(actual);
        };
    },


/**
 * "glob" (aka "wildmat") patterns, e.g. "glob:one,two,*"
 */
    glob: function(globString) {
        this.regexp = new RegExp(PatternMatcher.regexpFromGlob(globString));
        this.matches = function(actual) {
            return this.regexp.test(actual);
        };
    }

};

PatternMatcher.convertGlobMetaCharsToRegexpMetaChars = function(glob) {
    var re = glob;
    re = re.replace(/([.^$+(){}\[\]\\|])/g, "\\$1");
    re = re.replace(/\?/g, "(.|[\r\n])");
    re = re.replace(/\*/g, "(.|[\r\n])*");
    return re;
};

PatternMatcher.regexpFromGlobContains = function(globContains) {
    return PatternMatcher.convertGlobMetaCharsToRegexpMetaChars(globContains);
};

PatternMatcher.regexpFromGlob = function(glob) {
    return "^" + PatternMatcher.convertGlobMetaCharsToRegexpMetaChars(glob) + "$";
};

if (!this["Assert"]) Assert = {};


Assert.fail = function(message) {
    throw new AssertionFailedError(message);
};

/*
* Assert.equals(comment?, expected, actual)
*/
Assert.equals = function() {
    var args = new AssertionArguments(arguments);
    if (args.expected === args.actual) {
        return;
    }
    Assert.fail(args.comment +
                "Expected '" + args.expected +
                "' but was '" + args.actual + "'");
};

Assert.assertEquals = Assert.equals;

/*
* Assert.matches(comment?, pattern, actual)
*/
Assert.matches = function() {
    var args = new AssertionArguments(arguments);
    if (PatternMatcher.matches(args.expected, args.actual)) {
        return;
    }
    Assert.fail(args.comment +
                "Actual value '" + args.actual +
                "' did not match '" + args.expected + "'");
}

/*
* Assert.notMtches(comment?, pattern, actual)
*/
Assert.notMatches = function() {
    var args = new AssertionArguments(arguments);
    if (!PatternMatcher.matches(args.expected, args.actual)) {
        return;
    }
    Assert.fail(args.comment +
                "Actual value '" + args.actual +
                "' did match '" + args.expected + "'");
}


// Preprocess the arguments to allow for an optional comment.
function AssertionArguments(args) {
    if (args.length == 2) {
        this.comment = "";
        this.expected = args[0];
        this.actual = args[1];
    } else {
        this.comment = args[0] + "; ";
        this.expected = args[1];
        this.actual = args[2];
    }
}

function AssertionFailedError(message) {
    this.isAssertionFailedError = true;
    this.isSeleniumError = true;
    this.message = message;
    this.failureMessage = message;
}

function SeleniumError(message) {
    var error = new Error(message);
    if (typeof(arguments.caller) != 'undefined') { // IE, not ECMA
        var result = '';
        for (var a = arguments.caller; a != null; a = a.caller) {
            result += '> ' + a.callee.toString() + '\n';
            if (a.caller == a) {
                result += '*';
                break;
            }
        }
        error.stack = result;
    }
    error.isSeleniumError = true;
    return error;
}

function highlight(element) {
    var highLightColor = "yellow";
    if (element.originalColor == undefined) { // avoid picking up highlight
        element.originalColor = elementGetStyle(element, "background-color");
    }
    elementSetStyle(element, {"backgroundColor" : highLightColor});
    window.setTimeout(function() {
        try {
            //if element is orphan, probably page of it has already gone, so ignore
            if (!element.parentNode) {
                return;
            }
            elementSetStyle(element, {"backgroundColor" : element.originalColor});
        } catch (e) {} // DGF unhighlighting is very dangerous and low priority
    }, 200);
}



// for use from vs.2003 debugger
function o2s(obj) {
    var s = "";
    for (key in obj) {
        var line = key + "->" + obj[key];
        line.replace("\n", " ");
        s += line + "\n";
    }
    return s;
}

var seenReadyStateWarning = false;

function openSeparateApplicationWindow(url, suppressMozillaWarning) {
    // resize the Selenium window itself
    window.resizeTo(1200, 500);
    window.moveTo(window.screenX, 0);

    var appWindow = window.open(url + '?start=true', 'selenium_main_app_window');
    if (appWindow == null) {
        var errorMessage = "Couldn't open app window; is the pop-up blocker enabled?"
        LOG.error(errorMessage);
        throw new Error("Couldn't open app window; is the pop-up blocker enabled?");
    }
    try {
        var windowHeight = 500;
        if (window.outerHeight) {
            windowHeight = window.outerHeight;
        } else if (document.documentElement && document.documentElement.offsetHeight) {
            windowHeight = document.documentElement.offsetHeight;
        }

        if (window.screenLeft && !window.screenX) window.screenX = window.screenLeft;
        if (window.screenTop && !window.screenY) window.screenY = window.screenTop;

        appWindow.resizeTo(1200, screen.availHeight - windowHeight - 60);
        appWindow.moveTo(window.screenX, window.screenY + windowHeight + 25);
    } catch (e) {
        LOG.error("Couldn't resize app window");
        LOG.exception(e);
    }


    if (!suppressMozillaWarning && window.document.readyState == null && !seenReadyStateWarning) {
        alert("Beware!  Mozilla bug 300992 means that we can't always reliably detect when a new page has loaded.  Install the Selenium IDE extension or the readyState extension available from selenium.openqa.org to make page load detection more reliable.");
        seenReadyStateWarning = true;
    }

    return appWindow;
}

var URLConfiguration = classCreate();
objectExtend(URLConfiguration.prototype, {
    initialize: function() {
    },
    _isQueryParameterTrue: function (name) {
        var parameterValue = this._getQueryParameter(name);
        if (parameterValue == null) return false;
        if (parameterValue.toLowerCase() == "true") return true;
        if (parameterValue.toLowerCase() == "on") return true;
        return false;
    },

    _getQueryParameter: function(searchKey) {
        var str = this.queryString
        if (str == null) return null;
        var clauses = str.split('&');
        for (var i = 0; i < clauses.length; i++) {
            var keyValuePair = clauses[i].split('=', 2);
            var key = unescape(keyValuePair[0]);
            if (key == searchKey) {
                return unescape(keyValuePair[1]);
            }
        }
        return null;
    },

    _extractArgs: function() {
        var str = SeleniumHTARunner.commandLine;
        if (str == null || str == "") return new Array();
        var matches = str.match(/(?:\"([^\"]+)\"|(?!\"([^\"]+)\")(\S+))/g);
        // We either want non quote stuff ([^"]+) surrounded by quotes
        // or we want to look-ahead, see that the next character isn't
        // a quoted argument, and then grab all the non-space stuff
        // this will return for the line: "foo" bar
        // the results "\"foo\"" and "bar"

        // So, let's unquote the quoted arguments:
        var args = new Array;
        for (var i = 0; i < matches.length; i++) {
            args[i] = matches[i];
            args[i] = args[i].replace(/^"(.*)"$/, "$1");
        }
        return args;
    },

    isMultiWindowMode:function() {
        return this._isQueryParameterTrue('multiWindow');
    },
    
    getBaseUrl:function() {
        return this._getQueryParameter('baseUrl');
            
    }
});


function safeScrollIntoView(element) {
    if (element.scrollIntoView) {
        element.scrollIntoView(false);
        return;
    }
    // TODO: work out how to scroll browsers that don't support
    // scrollIntoView (like Konqueror)
}

/**
 * Returns the absolute time represented as an offset of the current time.
 * Throws a SeleniumException if timeout is invalid.
 *
 * @param timeout  the number of milliseconds from "now" whose absolute time
 *                 to return
 */
function getTimeoutTime(timeout) {
    var now = new Date().getTime();
    var timeoutLength = parseInt(timeout);
    
    if (isNaN(timeoutLength)) {
        throw new SeleniumError("Timeout is not a number: '" + timeout + "'");
    }
    
    return now + timeoutLength;
}

/**
 * Returns true iff the current environment is the IDE, and is not the chrome
 * runner launched by the IDE.
 */
function is_IDE() {
    var locstr = window.location.href;
    
    if (locstr.indexOf('chrome://selenium-ide-testrunner') == 0) {
         return false;
    }
    
    return (typeof(SeleniumIDE) != 'undefined');
}

/**
 * Logs a message if the Logger exists, and does nothing if it doesn't exist.
 *
 * @param level  the level to log at
 * @param msg    the message to log
 */
function safe_log(level, msg)
{
    try {
        LOG[level](msg);
    }
    catch (e) {
        // couldn't log!
    }
}

/**
 * Displays a warning message to the user appropriate to the context under
 * which the issue is encountered. This is primarily used to avoid popping up
 * alert dialogs that might pause an automated test suite.
 *
 * @param msg  the warning message to display
 */
function safe_alert(msg)
{
    if (is_IDE()) {
        alert(msg);
    }
}

/**
 * Returns true iff the given element represents a link with a javascript
 * href attribute, and does not have an onclick attribute defined.
 *
 * @param element  the element to test
 */
function hasJavascriptHref(element) {
    if (getTagName(element) != 'a') {
        return false;
    }
    if (element.getAttribute('onclick')) {
        return false;
    }
    if (! element.href) {
        return false;
    }
    if (! /\s*javascript:/i.test(element.href)) {
        return false;
    }
    return true;
}

/**
 * Returns the given element, or its nearest ancestor, that satisfies
 * hasJavascriptHref(). Returns null if none is found.
 *
 * @param element  the element whose ancestors to test
 */
function getAncestorOrSelfWithJavascriptHref(element) {
    if (hasJavascriptHref(element)) {
        return element;
    }
    if (element.parentNode == null) {
        return null;
    }
    return getAncestorOrSelfWithJavascriptHref(element.parentNode);
}

//******************************************************************************
// Locator evaluation support

/**
 * Parses a Selenium locator, returning its type and the unprefixed locator
 * string as an object.
 *
 * @param locator  the locator to parse
 */
function parse_locator(locator)
{
    var result = locator.match(/^([A-Za-z]+)=(.+)/);
    if (result) {
        return { type: result[1].toLowerCase(), string: result[2] };
    }
    return { type: 'implicit', string: locator };
}

/**
 * Evaluates an xpath on a document, and returns a list containing nodes in the
 * resulting nodeset. The browserbot xpath methods are now backed by this
 * function. A context node may optionally be provided, and the xpath will be
 * evaluated from that context.
 *
 * @param xpath       the xpath to evaluate
 * @param inDocument  the document in which to evaluate the xpath.
 * @param opts        (optional) An object containing various flags that can
 *                    modify how the xpath is evaluated. Here's a listing of
 *                    the meaningful keys:
 *
 *                     contextNode: 
 *                       the context node from which to evaluate the xpath. If
 *                       unspecified, the context will be the root document
 *                       element.
 *
 *                     namespaceResolver:
 *                       the namespace resolver function. Defaults to null.
 *
 *                     xpathLibrary:
 *                       the javascript library to use for XPath. "ajaxslt" is
 *                       the default. "javascript-xpath" is newer and faster,
 *                       but needs more testing.
 *
 *                     allowNativeXpath:
 *                       whether to allow native evaluate(). Defaults to true.
 *
 *                     ignoreAttributesWithoutValue:
 *                       whether it's ok to ignore attributes without value
 *                       when evaluating the xpath. This can greatly improve
 *                       performance in IE; however, if your xpaths depend on
 *                       such attributes, you can't ignore them! Defaults to
 *                       true.
 *
 *                     returnOnFirstMatch:
 *                       whether to optimize the XPath evaluation to only
 *                       return the first match. The match, if any, will still
 *                       be returned in a list. Defaults to false.
 */
function eval_xpath(xpath, inDocument, opts)
{
    if (!opts) {
        var opts = {};
    }
    var contextNode = opts.contextNode
        ? opts.contextNode : inDocument;
    var namespaceResolver = opts.namespaceResolver
        ? opts.namespaceResolver : null;
    var xpathLibrary = opts.xpathLibrary
        ? opts.xpathLibrary : null;
    var allowNativeXpath = (opts.allowNativeXpath != undefined)
        ? opts.allowNativeXpath : true;
    var ignoreAttributesWithoutValue = (opts.ignoreAttributesWithoutValue != undefined)
        ? opts.ignoreAttributesWithoutValue : true;
    var returnOnFirstMatch = (opts.returnOnFirstMatch != undefined)
        ? opts.returnOnFirstMatch : false;

    // Trim any trailing "/": not valid xpath, and remains from attribute
    // locator.
    if (xpath.charAt(xpath.length - 1) == '/') {
        xpath = xpath.slice(0, -1);
    }
    // HUGE hack - remove namespace from xpath for IE
    if (browserVersion && browserVersion.isIE) {
        xpath = xpath.replace(/x:/g, '')
    }
    
    var nativeXpathAvailable = inDocument.evaluate;
    var useNativeXpath = allowNativeXpath && nativeXpathAvailable;
    var useDocumentEvaluate = useNativeXpath;

    // When using the new and faster javascript-xpath library,
    // we'll use the TestRunner's document object, not the App-Under-Test's document.
    // The new library only modifies the TestRunner document with the new 
    // functionality.
    if (xpathLibrary == 'javascript-xpath' && !useNativeXpath) {
        documentForXpath = document;
        useDocumentEvaluate = true;
    } else {
        documentForXpath = inDocument;
    }
    var results = [];
    
    // this is either native xpath or javascript-xpath via TestRunner.evaluate 
    if (useDocumentEvaluate) {
        try {
            // Regarding use of the second argument to document.evaluate():
            // http://groups.google.com/group/comp.lang.javascript/browse_thread/thread/a59ce20639c74ba1/a9d9f53e88e5ebb5
            var xpathResult = documentForXpath
                .evaluate((contextNode == inDocument ? xpath : '.' + xpath),
                    contextNode, namespaceResolver, 0, null);
        }
        catch (e) {
            throw new SeleniumError("Invalid xpath [1]: " + extractExceptionMessage(e));
        }
        finally{
            if (xpathResult == null) {
                // If the result is null, we should still throw an Error.
                throw new SeleniumError("Invalid xpath [2]: " + xpath); 
            }
        }
        var result = xpathResult.iterateNext();
        while (result) {
            results.push(result);
            result = xpathResult.iterateNext();
        }
        return results;
    }

    // If not, fall back to slower JavaScript implementation
    // DGF set xpathdebug = true (using getEval, if you like) to turn on JS XPath debugging
    //xpathdebug = true;
    var context;
    if (contextNode == inDocument) {
        context = new ExprContext(inDocument);
    }
    else {
        // provide false values to get the default constructor values
        context = new ExprContext(contextNode, false, false,
            contextNode.parentNode);
    }
    context.setCaseInsensitive(true);
    context.setIgnoreAttributesWithoutValue(ignoreAttributesWithoutValue);
    context.setReturnOnFirstMatch(returnOnFirstMatch);
    var xpathObj;
    try {
        xpathObj = xpathParse(xpath);
    }
    catch (e) {
        throw new SeleniumError("Invalid xpath [3]: " + extractExceptionMessage(e));
    }
    var xpathResult = xpathObj.evaluate(context);
    if (xpathResult && xpathResult.value) {
        for (var i = 0; i < xpathResult.value.length; ++i) {
            results.push(xpathResult.value[i]);
        }
    }
    return results;
}

/**
 * Returns the full resultset of a CSS selector evaluation.
 */
function eval_css(locator, inDocument)
{
    return cssQuery(locator, inDocument);
}

/**
 * This function duplicates part of BrowserBot.findElement() to open up locator
 * evaluation on arbitrary documents. It returns a plain old array of located
 * elements found by using a Selenium locator.
 * 
 * Multiple results may be generated for xpath and CSS locators. Even though a
 * list could potentially be generated for other locator types, such as link,
 * we don't try for them, because they aren't very expressive location
 * strategies; if you want a list, use xpath or CSS. Furthermore, strategies
 * for these locators have been optimized to only return the first result. For
 * these types of locators, performance is more important than ideal behavior.
 * 
 * @param locator          a locator string
 * @param inDocument       the document in which to apply the locator
 * @param opt_contextNode  the context within which to evaluate the locator
 *
 * @return  a list of result elements
 */
function eval_locator(locator, inDocument, opt_contextNode)
{
    locator = parse_locator(locator);
    
    var pageBot;
    if (typeof(selenium) != 'undefined' && selenium != undefined) {
        if (typeof(editor) == 'undefined' || editor.state == 'playing') {
            safe_log('info', 'Trying [' + locator.type + ']: '
                + locator.string);
        }
        pageBot = selenium.browserbot;
    }
    else {
        if (!UI_GLOBAL.mozillaBrowserBot) {
            // create a browser bot to evaluate the locator. Hand it the IDE
            // window as a dummy window, and cache it for future use.
            UI_GLOBAL.mozillaBrowserBot = new MozillaBrowserBot(window)
        }
        pageBot = UI_GLOBAL.mozillaBrowserBot;
    }
    
    var results = [];
    
    if (locator.type == 'xpath' || (locator.string.charAt(0) == '/' &&
        locator.type == 'implicit')) {
        results = eval_xpath(locator.string, inDocument,
            { contextNode: opt_contextNode });
    }
    else if (locator.type == 'css') {
        results = eval_css(locator.string, inDocument);
    }
    else {
        var element = pageBot
            .findElementBy(locator.type, locator.string, inDocument);
        if (element != null) {
            results.push(element);
        }
    }
    
    return results;
}

//******************************************************************************
// UI-Element

/**
 * Escapes the special regular expression characters in a string intended to be
 * used as a regular expression.
 *
 * Based on: http://simonwillison.net/2006/Jan/20/escape/
 */
RegExp.escape = (function() {
    var specials = [
        '/', '.', '*', '+', '?', '|', '^', '$',
        '(', ')', '[', ']', '{', '}', '\\'
    ];
    
    var sRE = new RegExp(
        '(\\' + specials.join('|\\') + ')', 'g'
    );
  
    return function(text) {
        return text.replace(sRE, '\\$1');
    }
})();

/**
 * Returns true if two arrays are identical, and false otherwise.
 *
 * @param a1  the first array, may only contain simple values (strings or
 *            numbers)
 * @param a2  the second array, same restricts on data as for a1
 * @return    true if the arrays are equivalent, false otherwise.
 */
function are_equal(a1, a2)
{
    if (typeof(a1) != typeof(a2))
        return false;
    
    switch(typeof(a1)) {
        case 'object':
            // arrays
            if (a1.length) {
                if (a1.length != a2.length)
                    return false;
                for (var i = 0; i < a1.length; ++i) {
                    if (!are_equal(a1[i], a2[i]))
                        return false
                }
            }
            // associative arrays
            else {
                var keys = {};
                for (var key in a1) {
                    keys[key] = true;
                }
                for (var key in a2) {
                    keys[key] = true;
                }
                for (var key in keys) {
                    if (!are_equal(a1[key], a2[key]))
                        return false;
                }
            }
            return true;
            
        default:
            return a1 == a2;
    }
}


/**
 * Create a clone of an object and return it. This is a deep copy of everything
 * but functions, whose references are copied. You shouldn't expect a deep copy
 * of functions anyway.
 *
 * @param orig  the original object to copy
 * @return      a deep copy of the original object. Any functions attached,
 *              however, will have their references copied only.
 */
function clone(orig) {
    var copy;
    switch(typeof(orig)) {
        case 'object':
            copy = (orig.length) ? [] : {};
            for (var attr in orig) {
                copy[attr] = clone(orig[attr]);
            }
            break;
        default:
            copy = orig;
            break;
    }
    return copy;
}

/**
 * Emulates php's print_r() functionality. Returns a nicely formatted string
 * representation of an object. Very useful for debugging.
 *
 * @param object    the object to dump
 * @param maxDepth  the maximum depth to recurse into the object. Ellipses will
 *                  be shown for objects whose depth exceeds the maximum.
 * @param indent    the string to use for indenting progressively deeper levels
 *                  of the dump.
 * @return          a string representing a dump of the object
 */
function print_r(object, maxDepth, indent)
{
    var parentIndent, attr, str = "";
    if (arguments.length == 1) {
        var maxDepth = Number.MAX_VALUE;
    } else {
        maxDepth--;
    }
    if (arguments.length < 3) {
        parentIndent = ''
        var indent = '    ';
    } else {
        parentIndent = indent;
        indent += '    ';
    }

    switch(typeof(object)) {
    case 'object':
        if (object.length != undefined) {
            if (object.length == 0) {
                str += "Array ()\r\n";
            }
            else {
                str += "Array (\r\n";
                for (var i = 0; i < object.length; ++i) {
                    str += indent + '[' + i + '] => ';
                    if (maxDepth == 0)
                        str += "...\r\n";
                    else
                        str += print_r(object[i], maxDepth, indent);
                }
                str += parentIndent + ")\r\n";
            }
        }
        else {
            str += "Object (\r\n";
            for (attr in object) {
                str += indent + "[" + attr + "] => ";
                if (maxDepth == 0)
                    str += "...\r\n";
                else
                    str += print_r(object[attr], maxDepth, indent);
            }
            str += parentIndent + ")\r\n";
        }
        break;
    case 'boolean':
        str += (object ? 'true' : 'false') + "\r\n";
        break;
    case 'function':
        str += "Function\r\n";
        break;
    default:
        str += object + "\r\n";
        break;

    }
    return str;
}

/**
 * Return an array containing all properties of an object. Perl-style.
 *
 * @param object  the object whose keys to return
 * @return        array of object keys, as strings
 */
function keys(object)
{
    var keys = [];
    for (var k in object) {
        keys.push(k);
    }
    return keys;
}

/**
 * Emulates python's range() built-in. Returns an array of integers, counting
 * up (or down) from start to end. Note that the range returned is up to, but
 * NOT INCLUDING, end.
 *.
 * @param start  integer from which to start counting. If the end parameter is
 *               not provided, this value is considered the end and start will
 *               be zero.
 * @param end    integer to which to count. If omitted, the function will count
 *               up from zero to the value of the start parameter. Note that
 *               the array returned will count up to but will not include this
 *               value.
 * @return       an array of consecutive integers. 
 */
function range(start, end)
{
    if (arguments.length == 1) {
        var end = start;
        start = 0;
    }
    
    var r = [];
    if (start < end) {
        while (start != end)
            r.push(start++);
    }
    else {
        while (start != end)
            r.push(start--);
    }
    return r;
}

/**
 * Parses a python-style keyword arguments string and returns the pairs in a
 * new object.
 *
 * @param  kwargs  a string representing a set of keyword arguments. It should
 *                 look like <tt>keyword1=value1, keyword2=value2, ...</tt>
 * @return         an object mapping strings to strings
 */
function parse_kwargs(kwargs)
{
    var args = new Object();
    var pairs = kwargs.split(/,/);
    for (var i = 0; i < pairs.length;) {
        if (i > 0 && pairs[i].indexOf('=') == -1) {
            // the value string contained a comma. Glue the parts back together.
            pairs[i-1] += ',' + pairs.splice(i, 1)[0];
        }
        else {
            ++i;
        }
    }
    for (var i = 0; i < pairs.length; ++i) {
        var splits = pairs[i].split(/=/);
        if (splits.length == 1) {
            continue;
        }
        var key = splits.shift();
        var value = splits.join('=');
        args[key.trim()] = value.trim();
    }
    return args;
}

/**
 * Creates a python-style keyword arguments string from an object.
 *
 * @param args        an associative array mapping strings to strings
 * @param sortedKeys  (optional) a list of keys of the args parameter that
 *                    specifies the order in which the arguments will appear in
 *                    the returned kwargs string
 *
 * @return            a kwarg string representation of args
 */
function to_kwargs(args, sortedKeys)
{
    var s = '';
    if (!sortedKeys) {
        var sortedKeys = keys(args).sort();
    }
    for (var i = 0; i < sortedKeys.length; ++i) {
        var k = sortedKeys[i];
        if (args[k] != undefined) {
            if (s) {
                s += ', ';
            }
            s += k + '=' + args[k];
        }
    }
    return s;
}

/**
 * Returns true if a node is an ancestor node of a target node, and false
 * otherwise.
 *
 * @param node    the node being compared to the target node
 * @param target  the target node
 * @return        true if node is an ancestor node of target, false otherwise.
 */
function is_ancestor(node, target)
{
    while (target.parentNode) {
        target = target.parentNode;
        if (node == target)
            return true;
    }
    return false;
}

//******************************************************************************
// parseUri 1.2.1
// MIT License

/*
Copyright (c) 2007 Steven Levithan <stevenlevithan.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
*/

function parseUri (str) {
    var o   = parseUri.options,
        m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
        uri = {},
        i   = 14;

    while (i--) uri[o.key[i]] = m[i] || "";

    uri[o.q.name] = {};
    uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
        if ($1) uri[o.q.name][$1] = $2;
    });

    return uri;
};

parseUri.options = {
    strictMode: false,
    key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
    q:   {
        name:   "queryKey",
        parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    parser: {
        strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
        loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
};

/*
 * Copyright 2004 ThoughtWorks, Inc
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

elementFindMatchingChildren = function(element, selector) {
  var matches = [];

  var childCount = element.childNodes.length;
  for (var i=0; i<childCount; i++) {
    var child = element.childNodes[i];
    if (selector(child)) {
      matches.push(child);
    } else {
      childMatches = elementFindMatchingChildren(child, selector);
      matches.push(childMatches);
    }
  }

  return matches.flatten();
}

ELEMENT_NODE_TYPE = 1;

elementFindFirstMatchingChild = function(element, selector) {

  var childCount = element.childNodes.length;
  for (var i=0; i<childCount; i++) {
    var child = element.childNodes[i];
    if (child.nodeType == ELEMENT_NODE_TYPE) {
      if (selector(child)) {
        return child;
      }
      result = elementFindFirstMatchingChild(child, selector);
      if (result) {
        return result;
      }
    }
  }
  return null;
}

elementFindFirstMatchingParent = function(element, selector) {
  var current = element.parentNode;
  while (current != null) {
    if (selector(current)) {
      break;
    }
    current = current.parentNode;
  }
  return current;
}

elementFindMatchingChildById = function(element, id) {
  return elementFindFirstMatchingChild(element, function(element){return element.id==id} );
}

/*
* Copyright 2004 ThoughtWorks, Inc
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License.
*
*/

/*
* This script provides the Javascript API to drive the test application contained within
* a Browser Window.
* TODO:
*    Add support for more events (keyboard and mouse)
*    Allow to switch "user-entry" mode from mouse-based to keyboard-based, firing different
*          events in different modes.
*/

// The window to which the commands will be sent.  For example, to click on a
// popup window, first select that window, and then do a normal click command.
var BrowserBot = function(topLevelApplicationWindow) {
    this.topWindow = topLevelApplicationWindow;
    this.topFrame = this.topWindow;
    this.baseUrl=window.location.href;

    // the buttonWindow is the Selenium window
    // it contains the Run/Pause buttons... this should *not* be the AUT window
    this.buttonWindow = window;
    this.currentWindow = this.topWindow;
    this.currentWindowName = null;
    this.allowNativeXpath = true;
    this.xpathLibrary = this.defaultXpathLibrary = 'ajaxslt' // change to "javascript-xpath" for the newer, faster engine

    // We need to know this in advance, in case the frame closes unexpectedly
    this.isSubFrameSelected = false;

    this.altKeyDown = false;
    this.controlKeyDown = false;
    this.shiftKeyDown = false;
    this.metaKeyDown = false;

    this.modalDialogTest = null;
    this.recordedAlerts = new Array();
    this.recordedConfirmations = new Array();
    this.recordedPrompts = new Array();
    this.openedWindows = {};
    this.nextConfirmResult = true;
    this.nextPromptResult = '';
    this.newPageLoaded = false;
    this.pageLoadError = null;

    this.shouldHighlightLocatedElement = false;

    this.uniqueId = "seleniumMarker" + new Date().getTime();
    this.pollingForLoad = new Object();
    this.permDeniedCount = new Object();
    this.windowPollers = new Array();
    // DGF for backwards compatibility
    this.browserbot = this;

    var self = this;

    objectExtend(this, PageBot.prototype);
    this._registerAllLocatorFunctions();

    this.recordPageLoad = function(elementOrWindow) {
        LOG.debug("Page load detected");
        try {
            if (elementOrWindow.location && elementOrWindow.location.href) {
                LOG.debug("Page load location=" + elementOrWindow.location.href);
            } else if (elementOrWindow.contentWindow && elementOrWindow.contentWindow.location && elementOrWindow.contentWindow.location.href) {
                LOG.debug("Page load location=" + elementOrWindow.contentWindow.location.href);
            } else {
                LOG.debug("Page load location unknown, current window location=" + this.getCurrentWindow(true).location);
            }
        } catch (e) {
            LOG.error("Caught an exception attempting to log location; this should get noticed soon!");
            LOG.exception(e);
            self.pageLoadError = e;
            return;
        }
        self.newPageLoaded = true;
    };

    this.isNewPageLoaded = function() {
        if (this.pageLoadError) {
            LOG.error("isNewPageLoaded found an old pageLoadError");
            var e = this.pageLoadError;
            this.pageLoadError = null;
            throw e;
        }
        return self.newPageLoaded;
    };

};

// DGF PageBot exists for backwards compatibility with old user-extensions
var PageBot = function(){};

BrowserBot.createForWindow = function(window, proxyInjectionMode) {
    var browserbot;
    LOG.debug('createForWindow');
    LOG.debug("browserName: " + browserVersion.name);
    LOG.debug("userAgent: " + navigator.userAgent);
    if (browserVersion.isIE) {
        browserbot = new IEBrowserBot(window);
    }
    else if (browserVersion.isKonqueror) {
        browserbot = new KonquerorBrowserBot(window);
    }
    else if (browserVersion.isOpera) {
        browserbot = new OperaBrowserBot(window);
    }
    else if (browserVersion.isSafari) {
        browserbot = new SafariBrowserBot(window);
    }
    else {
        // Use mozilla by default
        browserbot = new MozillaBrowserBot(window);
    }
    // getCurrentWindow has the side effect of modifying it to handle page loads etc
    browserbot.proxyInjectionMode = proxyInjectionMode;
    browserbot.getCurrentWindow();    // for modifyWindow side effect.  This is not a transparent style
    return browserbot;
};

// todo: rename?  This doesn't actually "do" anything.
BrowserBot.prototype.doModalDialogTest = function(test) {
    this.modalDialogTest = test;
};

BrowserBot.prototype.cancelNextConfirmation = function(result) {
    this.nextConfirmResult = result;
};

BrowserBot.prototype.setNextPromptResult = function(result) {
    this.nextPromptResult = result;
};

BrowserBot.prototype.hasAlerts = function() {
    return (this.recordedAlerts.length > 0);
};

BrowserBot.prototype.relayBotToRC = function(s) {
    // DGF need to do this funny trick to see if we're in PI mode, because
    // "this" might be the window, rather than the browserbot (e.g. during window.alert) 
    var piMode = this.proxyInjectionMode;
    if (!piMode) {
        if (typeof(selenium) != "undefined") {
            piMode = selenium.browserbot && selenium.browserbot.proxyInjectionMode;
        }
    }
    if (piMode) {
        this.relayToRC("selenium." + s);
    }
};

BrowserBot.prototype.relayToRC = function(name) {
        var object = eval(name);
        var s = 'state:' + serializeObject(name, object) + "\n";
        sendToRC(s,"state=true");
}

BrowserBot.prototype.resetPopups = function() {
    this.recordedAlerts = [];
    this.recordedConfirmations = [];
    this.recordedPrompts = [];
}

BrowserBot.prototype.getNextAlert = function() {
    var t = this.recordedAlerts.shift();
    if (t) { 
        t = t.replace(/\n/g, " ");  // because Selenese loses \n's when retrieving text from HTML table
    }
    this.relayBotToRC("browserbot.recordedAlerts");
    return t;
};

BrowserBot.prototype.hasConfirmations = function() {
    return (this.recordedConfirmations.length > 0);
};

BrowserBot.prototype.getNextConfirmation = function() {
    var t = this.recordedConfirmations.shift();
    this.relayBotToRC("browserbot.recordedConfirmations");
    return t;
};

BrowserBot.prototype.hasPrompts = function() {
    return (this.recordedPrompts.length > 0);
};

BrowserBot.prototype.getNextPrompt = function() {
    var t = this.recordedPrompts.shift();
    this.relayBotToRC("browserbot.recordedPrompts");
    return t;
};

/* Fire a mouse event in a browser-compatible manner */

BrowserBot.prototype.triggerMouseEvent = function(element, eventType, canBubble, clientX, clientY, button) {
    clientX = clientX ? clientX : 0;
    clientY = clientY ? clientY : 0;

    LOG.debug("triggerMouseEvent assumes setting screenX and screenY to 0 is ok");
    var screenX = 0;
    var screenY = 0;

    canBubble = (typeof(canBubble) == undefined) ? true : canBubble;
    if (element.fireEvent && element.ownerDocument && element.ownerDocument.createEventObject) { //IE
        var evt = createEventObject(element, this.controlKeyDown, this.altKeyDown, this.shiftKeyDown, this.metaKeyDown);
        evt.detail = 0;
        evt.button = button ? button : 1; // default will be the left mouse click ( http://www.javascriptkit.com/jsref/event.shtml )
        evt.relatedTarget = null;
        if (!screenX && !screenY && !clientX && !clientY && !this.controlKeyDown && !this.altKeyDown && !this.shiftKeyDown && !this.metaKeyDown) {
            element.fireEvent('on' + eventType);
        }
        else {
            evt.screenX = screenX;
            evt.screenY = screenY;
            evt.clientX = clientX;
            evt.clientY = clientY;

            // when we go this route, window.event is never set to contain the event we have just created.
            // ideally we could just slide it in as follows in the try-block below, but this normally
            // doesn't work.  This is why I try to avoid this code path, which is only required if we need to
            // set attributes on the event (e.g., clientX).
            try {
                window.event = evt;
            }
            catch(e) {
                // getting an "Object does not support this action or property" error.  Save the event away
                // for future reference.
                // TODO: is there a way to update window.event?

                // work around for http://jira.openqa.org/browse/SEL-280 -- make the event available somewhere:
                selenium.browserbot.getCurrentWindow().selenium_event = evt;
            }
            element.fireEvent('on' + eventType, evt);
        }
    }
    else {
        var evt = document.createEvent('MouseEvents');
        if (evt.initMouseEvent)
        {
            // see http://developer.mozilla.org/en/docs/DOM:event.button and
            // http://developer.mozilla.org/en/docs/DOM:event.initMouseEvent for button ternary logic logic
            //Safari
            evt.initMouseEvent(eventType, canBubble, true, document.defaultView, 1, screenX, screenY, clientX, clientY,
                this.controlKeyDown, this.altKeyDown, this.shiftKeyDown, this.metaKeyDown, button ? button : 0, null);
        }
        else {
            LOG.warn("element doesn't have initMouseEvent; firing an event which should -- but doesn't -- have other mouse-event related attributes here, as well as controlKeyDown, altKeyDown, shiftKeyDown, metaKeyDown");
            evt.initEvent(eventType, canBubble, true);

            evt.shiftKey = this.shiftKeyDown;
            evt.metaKey = this.metaKeyDown;
            evt.altKey = this.altKeyDown;
            evt.ctrlKey = this.controlKeyDown;
            if(button)
            {
              evt.button = button;
            }
        }
        element.dispatchEvent(evt);
    }
}

BrowserBot.prototype._windowClosed = function(win) {
    var c = win.closed;
    if (c == null) return true;
    return c;
};

BrowserBot.prototype._modifyWindow = function(win) {
    // In proxyInjectionMode, have to suppress LOG calls in _modifyWindow to avoid an infinite loop
    if (this._windowClosed(win)) {
        if (!this.proxyInjectionMode) {
            LOG.error("modifyWindow: Window was closed!");
        }
        return null;
    }
    if (!this.proxyInjectionMode) {
        LOG.debug('modifyWindow ' + this.uniqueId + ":" + win[this.uniqueId]);
    }
    if (!win[this.uniqueId]) {
        win[this.uniqueId] = 1;
        this.modifyWindowToRecordPopUpDialogs(win, this);
    }
    // In proxyInjection mode, we have our own mechanism for detecting page loads
    if (!this.proxyInjectionMode) {
        this.modifySeparateTestWindowToDetectPageLoads(win);
    }
    if (win.frames && win.frames.length && win.frames.length > 0) {
        for (var i = 0; i < win.frames.length; i++) {
            try {
                this._modifyWindow(win.frames[i]);
            } catch (e) {} // we're just trying to be opportunistic; don't worry if this doesn't work out
        }
    }
    return win;
};

BrowserBot.prototype.selectWindow = function(target) {
    if (!target || target == "null") {
        this._selectTopWindow();
        return;
    }
    var result = target.match(/^([a-zA-Z]+)=(.*)/);
    if (!result) {
        this._selectWindowByWindowId(target);
        return;
    }
    locatorType = result[1];
    locatorValue = result[2];
    if (locatorType == "title") {
        this._selectWindowByTitle(locatorValue);
    }
    // TODO separate name and var into separate functions
    else if (locatorType == "name") {
        this._selectWindowByName(locatorValue);
    } else if (locatorType == "var") {
        this._selectWindowByName(locatorValue);
    } else {
        throw new SeleniumError("Window locator not recognized: " + locatorType);
    }
};

BrowserBot.prototype.selectPopUp = function(windowId) {
    if (! windowId || windowId == 'null') {
        this._selectFirstNonTopWindow();
    }
    else {
        this._selectWindowByWindowId(windowId);
    }
};

BrowserBot.prototype._selectTopWindow = function() {
    this.currentWindowName = null;
    this.currentWindow = this.topWindow;
    this.topFrame = this.topWindow;
    this.isSubFrameSelected = false;
}

BrowserBot.prototype._selectWindowByWindowId = function(windowId) {
    try {
        this._selectWindowByName(windowId);
    }
    catch (e) {
        this._selectWindowByTitle(windowId);
    }
};

BrowserBot.prototype._selectWindowByName = function(target) {
    this.currentWindow = this.getWindowByName(target, false);
    this.topFrame = this.currentWindow;
    this.currentWindowName = target;
    this.isSubFrameSelected = false;
}

BrowserBot.prototype._selectWindowByTitle = function(target) {
    var windowName = this.getWindowNameByTitle(target);
    if (!windowName) {
        this._selectTopWindow();
    } else {
        this._selectWindowByName(windowName);
    }
}

BrowserBot.prototype._selectFirstNonTopWindow = function() {
    var names = this.getNonTopWindowNames();
    if (names.length) {
        this._selectWindowByName(names[0]);
    }
};

BrowserBot.prototype.selectFrame = function(target) {
    if (target.indexOf("index=") == 0) {
        target = target.substr(6);
        var frame = this.getCurrentWindow().frames[target];
        if (frame == null) {
            throw new SeleniumError("Not found: frames["+target+"]");
        }
        if (!frame.document) {
            throw new SeleniumError("frames["+target+"] is not a frame");
        }
        this.currentWindow = frame;
        this.isSubFrameSelected = true;
    }
    else if (target == "relative=up" || target == "relative=parent") {
        this.currentWindow = this.getCurrentWindow().parent;
        this.isSubFrameSelected = (this._getFrameElement(this.currentWindow) != null);
    } else if (target == "relative=top") {
        this.currentWindow = this.topFrame;
        this.isSubFrameSelected = false;
    } else {
        var frame = this.findElement(target);
        if (frame == null) {
            throw new SeleniumError("Not found: " + target);
        }
        // now, did they give us a frame or a frame ELEMENT?
        var match = false;
        if (frame.contentWindow) {
            // this must be a frame element
            if (browserVersion.isHTA) {
                // stupid HTA bug; can't get in the front door
                target = frame.contentWindow.name;
            } else {
                this.currentWindow = frame.contentWindow;
                this.isSubFrameSelected = true;
                match = true;
            }
        } else if (frame.document && frame.location) {
            // must be an actual window frame
            this.currentWindow = frame;
            this.isSubFrameSelected = true;
            match = true;
        }

        if (!match) {
            // neither, let's loop through the frame names
            var win = this.getCurrentWindow();

            if (win && win.frames && win.frames.length) {
                for (var i = 0; i < win.frames.length; i++) {
                    if (win.frames[i].name == target) {
                        this.currentWindow = win.frames[i];
                        this.isSubFrameSelected = true;
                        match = true;
                        break;
                    }
                }
            }
            if (!match) {
                throw new SeleniumError("Not a frame: " + target);
            }
        }
    }
    // modifies the window
    this.getCurrentWindow();
};

BrowserBot.prototype.doesThisFrameMatchFrameExpression = function(currentFrameString, target) {
    var isDom = false;
    if (target.indexOf("dom=") == 0) {
        target = target.substr(4);
        isDom = true;
    } else if (target.indexOf("index=") == 0) {
        target = "frames[" + target.substr(6) + "]";
        isDom = true;
    }
    var t;
    try {
        eval("t=" + currentFrameString + "." + target);
    } catch (e) {
    }
    var autWindow = this.browserbot.getCurrentWindow();
    if (t != null) {
        try {
            if (t.window == autWindow) {
                return true;
            }
            if (t.window.uniqueId == autWindow.uniqueId) {
                return true;
               }
            return false;
        } catch (permDenied) {
            // DGF if the windows are incomparable, they're probably not the same...
        }
    }
    if (isDom) {
        return false;
    }
    var currentFrame;
    eval("currentFrame=" + currentFrameString);
    if (target == "relative=up") {
        if (currentFrame.window.parent == autWindow) {
            return true;
        }
        return false;
    }
    if (target == "relative=top") {
        if (currentFrame.window.top == autWindow) {
            return true;
        }
        return false;
    }
    if (currentFrame.window == autWindow.parent) {
        if (autWindow.name == target) {
            return true;
        }
        try {
            var element = this.findElement(target, currentFrame.window);
            if (element.contentWindow == autWindow) {
                return true;
            }
        } catch (e) {}
    }
    return false;
};

BrowserBot.prototype.openLocation = function(target) {
    // We're moving to a new page - clear the current one
    var win = this.getCurrentWindow();
    LOG.debug("openLocation newPageLoaded = false");
    this.newPageLoaded = false;

    this.setOpenLocation(win, target);
};

BrowserBot.prototype.openWindow = function(url, windowID) {
    if (url != "") {
        url = absolutify(url, this.baseUrl);
    }
    if (browserVersion.isHTA) {
        // in HTA mode, calling .open on the window interprets the url relative to that window
        // we need to absolute-ize the URL to make it consistent
        var child = this.getCurrentWindow().open(url, windowID);
        selenium.browserbot.openedWindows[windowID] = child;
    } else {
        this.getCurrentWindow().open(url, windowID);
    }
};

BrowserBot.prototype.setIFrameLocation = function(iframe, location) {
    iframe.src = location;
};

BrowserBot.prototype.setOpenLocation = function(win, loc) {
    loc = absolutify(loc, this.baseUrl);
    if (browserVersion.isHTA) {
        var oldHref = win.location.href;
        win.location.href = loc;
        var marker = null;
        try {
            marker = this.isPollingForLoad(win);
            if (marker && win.location[marker]) {
                win.location[marker] = false;
            }
        } catch (e) {} // DGF don't know why, but this often fails
    } else {
        win.location.href = loc;
    }
};

BrowserBot.prototype.getCurrentPage = function() {
    return this;
};

BrowserBot.prototype.modifyWindowToRecordPopUpDialogs = function(windowToModify, browserBot) {
    var self = this;

    windowToModify.seleniumAlert = windowToModify.alert;

    windowToModify.alert = function(alert) {
        browserBot.recordedAlerts.push(alert);
        self.relayBotToRC.call(self, "browserbot.recordedAlerts");
    };

    windowToModify.confirm = function(message) {
        browserBot.recordedConfirmations.push(message);
        var result = browserBot.nextConfirmResult;
        browserBot.nextConfirmResult = true;
        self.relayBotToRC.call(self, "browserbot.recordedConfirmations");
        return result;
    };

    windowToModify.prompt = function(message) {
        browserBot.recordedPrompts.push(message);
        var result = !browserBot.nextConfirmResult ? null : browserBot.nextPromptResult;
        browserBot.nextConfirmResult = true;
        browserBot.nextPromptResult = '';
        self.relayBotToRC.call(self, "browserbot.recordedPrompts");
        return result;
    };

    // Keep a reference to all popup windows by name
    // note that in IE the "windowName" argument must be a valid javascript identifier, it seems.
    var originalOpen = windowToModify.open;
    var originalOpenReference;
    if (browserVersion.isHTA) {
        originalOpenReference = 'selenium_originalOpen' + new Date().getTime();
        windowToModify[originalOpenReference] = windowToModify.open;
    }

    var isHTA = browserVersion.isHTA;

    var newOpen = function(url, windowName, windowFeatures, replaceFlag) {
        var myOriginalOpen = originalOpen;
        if (isHTA) {
            myOriginalOpen = this[originalOpenReference];
        }
        if (windowName == "" || windowName == "_blank") {
            windowName = "selenium_blank" + Math.round(100000 * Math.random());
            LOG.warn("Opening window '_blank', which is not a real window name.  Randomizing target to be: " + windowName);
        }
        var openedWindow = myOriginalOpen(url, windowName, windowFeatures, replaceFlag);
        LOG.debug("window.open call intercepted; window ID (which you can use with selectWindow()) is \"" +  windowName + "\"");
        if (windowName!=null) {
            openedWindow["seleniumWindowName"] = windowName;
        }
        selenium.browserbot.openedWindows[windowName] = openedWindow;
        return openedWindow;
    };

    if (browserVersion.isHTA) {
        originalOpenReference = 'selenium_originalOpen' + new Date().getTime();
        newOpenReference = 'selenium_newOpen' + new Date().getTime();
        var setOriginalRef = "this['" + originalOpenReference + "'] = this.open;";

        if (windowToModify.eval) {
            windowToModify.eval(setOriginalRef);
            windowToModify.open = newOpen;
        } else {
            // DGF why can't I eval here?  Seems like I'm querying the window at a bad time, maybe?
            setOriginalRef += "this.open = this['" + newOpenReference + "'];";
            windowToModify[newOpenReference] = newOpen;
            windowToModify.setTimeout(setOriginalRef, 0);
        }
    } else {
        windowToModify.open = newOpen;
    }
};

/**
 * Call the supplied function when a the current page unloads and a new one loads.
 * This is done by polling continuously until the document changes and is fully loaded.
 */
BrowserBot.prototype.modifySeparateTestWindowToDetectPageLoads = function(windowObject) {
    // Since the unload event doesn't fire in Safari 1.3, we start polling immediately
    if (!windowObject) {
        LOG.warn("modifySeparateTestWindowToDetectPageLoads: no windowObject!");
        return;
    }
    if (this._windowClosed(windowObject)) {
        LOG.info("modifySeparateTestWindowToDetectPageLoads: windowObject was closed");
        return;
    }
    var oldMarker = this.isPollingForLoad(windowObject);
    if (oldMarker) {
        LOG.debug("modifySeparateTestWindowToDetectPageLoads: already polling this window: " + oldMarker);
        return;
    }

    var marker = 'selenium' + new Date().getTime();
    LOG.debug("Starting pollForLoad (" + marker + "): " + windowObject.location);
    this.pollingForLoad[marker] = true;
    // if this is a frame, add a load listener, otherwise, attach a poller
    var frameElement = this._getFrameElement(windowObject);
    // DGF HTA mode can't attach load listeners to subframes (yuk!)
    var htaSubFrame = this._isHTASubFrame(windowObject);
    if (frameElement && !htaSubFrame) {
        LOG.debug("modifySeparateTestWindowToDetectPageLoads: this window is a frame; attaching a load listener");
        addLoadListener(frameElement, this.recordPageLoad);
        frameElement[marker] = true;
        frameElement["frame"+this.uniqueId] = marker;
	LOG.debug("dgf this.uniqueId="+this.uniqueId);
	LOG.debug("dgf marker="+marker);
	LOG.debug("dgf frameElement['frame'+this.uniqueId]="+frameElement['frame'+this.uniqueId]);
frameElement[this.uniqueId] = marker;
LOG.debug("dgf frameElement[this.uniqueId]="+frameElement[this.uniqueId]);
    } else {
        windowObject.location[marker] = true;
        windowObject[this.uniqueId] = marker;
        this.pollForLoad(this.recordPageLoad, windowObject, windowObject.document, windowObject.location, windowObject.location.href, marker);
    }
};

BrowserBot.prototype._isHTASubFrame = function(win) {
    if (!browserVersion.isHTA) return false;
    // DGF this is wrong! what if "win" isn't the selected window?
    return this.isSubFrameSelected;
}

BrowserBot.prototype._getFrameElement = function(win) {
    var frameElement = null;
    var caught;
    try {
        frameElement = win.frameElement;
    } catch (e) {
        caught = true;
    }
    if (caught) {
        // on IE, checking frameElement in a pop-up results in a "No such interface supported" exception
        // but it might have a frame element anyway!
        var parentContainsIdenticallyNamedFrame = false;
        try {
            parentContainsIdenticallyNamedFrame = win.parent.frames[win.name];
        } catch (e) {} // this may fail if access is denied to the parent; in that case, assume it's not a pop-up

        if (parentContainsIdenticallyNamedFrame) {
            // it can't be a coincidence that the parent has a frame with the same name as myself!
            var result;
            try {
                result = parentContainsIdenticallyNamedFrame.frameElement;
                if (result) {
                    return result;
                }
            } catch (e) {} // it was worth a try! _getFrameElementsByName is often slow
            result = this._getFrameElementByName(win.name, win.parent.document, win);
            return result;
        }
    }
    LOG.debug("_getFrameElement: frameElement="+frameElement); 
    if (frameElement) {
        LOG.debug("frameElement.name="+frameElement.name);
    }
    return frameElement;
}

BrowserBot.prototype._getFrameElementByName = function(name, doc, win) {
    var frames;
    var frame;
    var i;
    frames = doc.getElementsByTagName("iframe");
    for (i = 0; i < frames.length; i++) {
        frame = frames[i];        
        if (frame.name === name) {
            return frame;
        }
    }
    frames = doc.getElementsByTagName("frame");
    for (i = 0; i < frames.length; i++) {
        frame = frames[i];        
        if (frame.name === name) {
            return frame;
        }
    }
    // DGF weird; we only call this function when we know the doc contains the frame
    LOG.warn("_getFrameElementByName couldn't find a frame or iframe; checking every element for the name " + name);
    return BrowserBot.prototype.locateElementByName(win.name, win.parent.document);
}
    

/**
 * Set up a polling timer that will keep checking the readyState of the document until it's complete.
 * Since we might call this before the original page is unloaded, we first check to see that the current location
 * or href is different from the original one.
 */
BrowserBot.prototype.pollForLoad = function(loadFunction, windowObject, originalDocument, originalLocation, originalHref, marker) {
    LOG.debug("pollForLoad original (" + marker + "): " + originalHref);
    try {
        if (this._windowClosed(windowObject)) {
            LOG.debug("pollForLoad WINDOW CLOSED (" + marker + ")");
            delete this.pollingForLoad[marker];
            return;
        }

        var isSamePage = this._isSamePage(windowObject, originalDocument, originalLocation, originalHref, marker);
        var rs = this.getReadyState(windowObject, windowObject.document);

        if (!isSamePage && rs == 'complete') {
            var currentHref = windowObject.location.href;
            LOG.debug("pollForLoad FINISHED (" + marker + "): " + rs + " (" + currentHref + ")");
            delete this.pollingForLoad[marker];
            this._modifyWindow(windowObject);
            var newMarker = this.isPollingForLoad(windowObject);
            if (!newMarker) {
                LOG.debug("modifyWindow didn't start new poller: " + newMarker);
                this.modifySeparateTestWindowToDetectPageLoads(windowObject);
            }
            newMarker = this.isPollingForLoad(windowObject);
            var currentlySelectedWindow;
            var currentlySelectedWindowMarker;
            currentlySelectedWindow =this.getCurrentWindow(true);
            currentlySelectedWindowMarker = currentlySelectedWindow[this.uniqueId];

            LOG.debug("pollForLoad (" + marker + ") restarting " + newMarker);
            if (/(TestRunner-splash|Blank)\.html\?start=true$/.test(currentHref)) {
                LOG.debug("pollForLoad Oh, it's just the starting page.  Never mind!");
            } else if (currentlySelectedWindowMarker == newMarker) {
                loadFunction(currentlySelectedWindow);
            } else {
                LOG.debug("pollForLoad page load detected in non-current window; ignoring (currentlySelected="+currentlySelectedWindowMarker+", detection in "+newMarker+")");
            }
            return;
        }
        LOG.debug("pollForLoad continue (" + marker + "): " + currentHref);
        this.reschedulePoller(loadFunction, windowObject, originalDocument, originalLocation, originalHref, marker);
    } catch (e) {
        LOG.debug("Exception during pollForLoad; this should get noticed soon (" + e.message + ")!");
        //DGF this is supposed to get logged later; log it at debug just in case
        //LOG.exception(e);
        this.pageLoadError = e;
    }
};

BrowserBot.prototype._isSamePage = function(windowObject, originalDocument, originalLocation, originalHref, marker) {
    var currentDocument = windowObject.document;
    var currentLocation = windowObject.location;
    var currentHref = currentLocation.href

    var sameDoc = this._isSameDocument(originalDocument, currentDocument);

    var sameLoc = (originalLocation === currentLocation);

    // hash marks don't meant the page has loaded, so we need to strip them off if they exist...
    var currentHash = currentHref.indexOf('#');
    if (currentHash > 0) {
        currentHref = currentHref.substring(0, currentHash);
    }
    var originalHash = originalHref.indexOf('#');
    if (originalHash > 0) {
        originalHref = originalHref.substring(0, originalHash);
    }
    LOG.debug("_isSamePage: currentHref: " + currentHref);
    LOG.debug("_isSamePage: originalHref: " + originalHref);

    var sameHref = (originalHref === currentHref);
    var markedLoc = currentLocation[marker];

    if (browserVersion.isKonqueror || browserVersion.isSafari) {
        // the mark disappears too early on these browsers
        markedLoc = true;
    }

    // since this is some _very_ important logic, especially for PI and multiWindow mode, we should log all these out
    LOG.debug("_isSamePage: sameDoc: " + sameDoc);
    LOG.debug("_isSamePage: sameLoc: " + sameLoc);
    LOG.debug("_isSamePage: sameHref: " + sameHref);
    LOG.debug("_isSamePage: markedLoc: " + markedLoc);

    return sameDoc && sameLoc && sameHref && markedLoc
};

BrowserBot.prototype._isSameDocument = function(originalDocument, currentDocument) {
    return originalDocument === currentDocument;
};


BrowserBot.prototype.getReadyState = function(windowObject, currentDocument) {
    var rs = currentDocument.readyState;
    if (rs == null) {
       if ((this.buttonWindow!=null && this.buttonWindow.document.readyState == null) // not proxy injection mode (and therefore buttonWindow isn't null)
       || (top.document.readyState == null)) {                                               // proxy injection mode (and therefore everything's in the top window, but buttonWindow doesn't exist)
            // uh oh!  we're probably on Firefox with no readyState extension installed!
            // We'll have to just take a guess as to when the document is loaded; this guess
            // will never be perfect. :-(
            if (typeof currentDocument.getElementsByTagName != 'undefined'
                    && typeof currentDocument.getElementById != 'undefined'
                    && ( currentDocument.getElementsByTagName('body')[0] != null
                    || currentDocument.body != null )) {
                if (windowObject.frameElement && windowObject.location.href == "about:blank" && windowObject.frameElement.src != "about:blank") {
                    LOG.info("getReadyState not loaded, frame location was about:blank, but frame src = " + windowObject.frameElement.src);
                    return null;
                }
                LOG.debug("getReadyState = windowObject.frames.length = " + windowObject.frames.length);
                for (var i = 0; i < windowObject.frames.length; i++) {
                    LOG.debug("i = " + i);
                    if (this.getReadyState(windowObject.frames[i], windowObject.frames[i].document) != 'complete') {
                        LOG.debug("getReadyState aha! the nested frame " + windowObject.frames[i].name + " wasn't ready!");
                        return null;
                    }
                }

                rs = 'complete';
            } else {
                LOG.debug("pollForLoad readyState was null and DOM appeared to not be ready yet");
            }
        }
    }
    else if (rs == "loading" && browserVersion.isIE) {
        LOG.debug("pageUnloading = true!!!!");
        this.pageUnloading = true;
    }
    LOG.debug("getReadyState returning " + rs);
    return rs;
};

/** This function isn't used normally, but was the way we used to schedule pollers:
 asynchronously executed autonomous units.  This is deprecated, but remains here
 for future reference.
 */
BrowserBot.prototype.XXXreschedulePoller = function(loadFunction, windowObject, originalDocument, originalLocation, originalHref, marker) {
    var self = this;
    window.setTimeout(function() {
        self.pollForLoad(loadFunction, windowObject, originalDocument, originalLocation, originalHref, marker);
    }, 500);
};

/** This function isn't used normally, but is useful for debugging asynchronous pollers
 * To enable it, rename it to "reschedulePoller", so it will override the
 * existing reschedulePoller function
 */
BrowserBot.prototype.XXXreschedulePoller = function(loadFunction, windowObject, originalDocument, originalLocation, originalHref, marker) {
    var doc = this.buttonWindow.document;
    var button = doc.createElement("button");
    var buttonName = doc.createTextNode(marker + " - " + windowObject.name);
    button.appendChild(buttonName);
    var tools = doc.getElementById("tools");
    var self = this;
    button.onclick = function() {
        tools.removeChild(button);
        self.pollForLoad(loadFunction, windowObject, originalDocument, originalLocation, originalHref, marker);
    };
    tools.appendChild(button);
    window.setTimeout(button.onclick, 500);
};

BrowserBot.prototype.reschedulePoller = function(loadFunction, windowObject, originalDocument, originalLocation, originalHref, marker) {
    var self = this;
    var pollerFunction = function() {
        self.pollForLoad(loadFunction, windowObject, originalDocument, originalLocation, originalHref, marker);
    };
    this.windowPollers.push(pollerFunction);
};

BrowserBot.prototype.runScheduledPollers = function() {
    LOG.debug("runScheduledPollers");
    var oldPollers = this.windowPollers;
    this.windowPollers = new Array();
    for (var i = 0; i < oldPollers.length; i++) {
        oldPollers[i].call();
    }
    LOG.debug("runScheduledPollers DONE");
};

BrowserBot.prototype.isPollingForLoad = function(win) {
    var marker;
    var frameElement = this._getFrameElement(win);
    var htaSubFrame = this._isHTASubFrame(win);
    if (frameElement && !htaSubFrame) {
	marker = frameElement["frame"+this.uniqueId];
    } else {
        marker = win[this.uniqueId];
    }
    if (!marker) {
        LOG.debug("isPollingForLoad false, missing uniqueId " + this.uniqueId + ": " + marker);
        return false;
    }
    if (!this.pollingForLoad[marker]) {
        LOG.debug("isPollingForLoad false, this.pollingForLoad[" + marker + "]: " + this.pollingForLoad[marker]);
        return false;
    }
    return marker;
};

BrowserBot.prototype.getWindowByName = function(windowName, doNotModify) {
    LOG.debug("getWindowByName(" + windowName + ")");
    // First look in the map of opened windows
    var targetWindow = this.openedWindows[windowName];
    if (!targetWindow) {
        targetWindow = this.topWindow[windowName];
    }
    if (!targetWindow && windowName == "_blank") {
        for (var winName in this.openedWindows) {
            // _blank can match selenium_blank*, if it looks like it's OK (valid href, not closed)
            if (/^selenium_blank/.test(winName)) {
                targetWindow = this.openedWindows[winName];
                var ok;
                try {
                    if (!this._windowClosed(targetWindow)) {
                        ok = targetWindow.location.href;
                    }
                } catch (e) {}
                if (ok) break;
            }
        }
    }
    if (!targetWindow) {
        throw new SeleniumError("Window does not exist. If this looks like a Selenium bug, make sure to read http://selenium-core.openqa.org/reference.html#openWindow for potential workarounds.");
    }
    if (browserVersion.isHTA) {
        try {
            targetWindow.location.href;
        } catch (e) {
            targetWindow = window.open("", targetWindow.name);
            this.openedWindows[targetWindow.name] = targetWindow;
        }
    }
    if (!doNotModify) {
        this._modifyWindow(targetWindow);
    }
    return targetWindow;
};

/**
 * Find a window name from the window title.
 */
BrowserBot.prototype.getWindowNameByTitle = function(windowTitle) {
    LOG.debug("getWindowNameByTitle(" + windowTitle + ")");

    // First look in the map of opened windows and iterate them
    for (var windowName in this.openedWindows) {
        var targetWindow = this.openedWindows[windowName];

        // If the target window's title is our title
        try {
            // TODO implement Pattern Matching here
            if (!this._windowClosed(targetWindow) &&
                targetWindow.document.title == windowTitle) {
                return windowName;
            }
        } catch (e) {
            // You'll often get Permission Denied errors here in IE
            // eh, if we can't read this window's title,
            // it's probably not available to us right now anyway
        }
    }
    
    try {
        if (this.topWindow.document.title == windowTitle) {
            return "";
        }
    } catch (e) {} // IE Perm denied

    throw new SeleniumError("Could not find window with title " + windowTitle);
};

BrowserBot.prototype.getNonTopWindowNames = function() {
    var nonTopWindowNames = [];
    
    for (var windowName in this.openedWindows) {
        var win = this.openedWindows[windowName];
        if (! this._windowClosed(win) && win != this.topWindow) {
            nonTopWindowNames.push(windowName);
        }
    }
    
    return nonTopWindowNames;
};

BrowserBot.prototype.getCurrentWindow = function(doNotModify) {
    if (this.proxyInjectionMode) {
        return window;
    }
    var testWindow = this.currentWindow;
    if (!doNotModify) {
        this._modifyWindow(testWindow);
        LOG.debug("getCurrentWindow newPageLoaded = false");
        this.newPageLoaded = false;
    }
    testWindow = this._handleClosedSubFrame(testWindow, doNotModify);
    return testWindow;
};

/**
 * Offer a method the end-user can reliably use to retrieve the current window.
 * This should work even for windows with an XPCNativeWrapper. Returns the
 * current window object.
 */
BrowserBot.prototype.getUserWindow = function() {
    var userWindow = this.getCurrentWindow(true);
    
    if (userWindow.wrappedJSObject) {
        userWindow = userWindow.wrappedJSObject;
    }
    
    return userWindow;
};

BrowserBot.prototype._handleClosedSubFrame = function(testWindow, doNotModify) {
    if (this.proxyInjectionMode) {
        return testWindow;
    }

    if (this.isSubFrameSelected) {
        var missing = true;
        if (testWindow.parent && testWindow.parent.frames && testWindow.parent.frames.length) {
            for (var i = 0; i < testWindow.parent.frames.length; i++) {
                if (testWindow.parent.frames[i] == testWindow) {
                    missing = false;
                    break;
                }
            }
        }
        if (missing) {
            LOG.warn("Current subframe appears to have closed; selecting top frame");
            this.selectFrame("relative=top");
            return this.getCurrentWindow(doNotModify);
        }
    } else if (this._windowClosed(testWindow)) {
        var closedError = new SeleniumError("Current window or frame is closed!");
        closedError.windowClosed = true;
        throw closedError;
    }
    return testWindow;
};

BrowserBot.prototype.highlight = function (element, force) {
    if (force || this.shouldHighlightLocatedElement) {
        try {
            highlight(element);
        } catch (e) {} // DGF element highlighting is low-priority and possibly dangerous
    }
    return element;
}

BrowserBot.prototype.setShouldHighlightElement = function (shouldHighlight) {
    this.shouldHighlightLocatedElement = shouldHighlight;
}

/*****************************************************************/
/* BROWSER-SPECIFIC FUNCTIONS ONLY AFTER THIS LINE */


BrowserBot.prototype._registerAllLocatorFunctions = function() {
    // TODO - don't do this in the constructor - only needed once ever
    this.locationStrategies = {};
    for (var functionName in this) {
        var result = /^locateElementBy([A-Z].+)$/.exec(functionName);
        if (result != null) {
            var locatorFunction = this[functionName];
            if (typeof(locatorFunction) != 'function') {
                continue;
            }
            // Use a specified prefix in preference to one generated from
            // the function name
            var locatorPrefix = locatorFunction.prefix || result[1].toLowerCase();
            this.locationStrategies[locatorPrefix] = locatorFunction;
        }
    }

    /**
     * Find a locator based on a prefix.
     */
    this.findElementBy = function(locatorType, locator, inDocument, inWindow) {
        var locatorFunction = this.locationStrategies[locatorType];
        if (! locatorFunction) {
            throw new SeleniumError("Unrecognised locator type: '" + locatorType + "'");
        }
        return locatorFunction.call(this, locator, inDocument, inWindow);
    };

    /**
     * The implicit locator, that is used when no prefix is supplied.
     */
    this.locationStrategies['implicit'] = function(locator, inDocument, inWindow) {
        if (locator.startsWith('//')) {
            return this.locateElementByXPath(locator, inDocument, inWindow);
        }
        if (locator.startsWith('document.')) {
            return this.locateElementByDomTraversal(locator, inDocument, inWindow);
        }
        return this.locateElementByIdentifier(locator, inDocument, inWindow);
    };
}

BrowserBot.prototype.getDocument = function() {
    return this.getCurrentWindow().document;
}

BrowserBot.prototype.getTitle = function() {
    var t = this.getDocument().title;
    if (typeof(t) == "string") {
        t = t.trim();
    }
    return t;
}

BrowserBot.prototype.getCookieByName = function(cookieName, doc) {
    if (!doc) doc = this.getDocument();
    var ck = doc.cookie;
    if (!ck) return null;
    var ckPairs = ck.split(/;/);
    for (var i = 0; i < ckPairs.length; i++) {
        var ckPair = ckPairs[i].trim();
        var ckNameValue = ckPair.split(/=/);
        var ckName = decodeURIComponent(ckNameValue[0]);
        if (ckName === cookieName) {
            return decodeURIComponent(ckNameValue[1]);
        }
    }
    return null;
}

BrowserBot.prototype.getAllCookieNames = function(doc) {
    if (!doc) doc = this.getDocument();
    var ck = doc.cookie;
    if (!ck) return [];
    var cookieNames = [];
    var ckPairs = ck.split(/;/);
    for (var i = 0; i < ckPairs.length; i++) {
        var ckPair = ckPairs[i].trim();
        var ckNameValue = ckPair.split(/=/);
        var ckName = decodeURIComponent(ckNameValue[0]);
        cookieNames.push(ckName);
    }
    return cookieNames;
}

BrowserBot.prototype.deleteCookie = function(cookieName, domain, path, doc) {
    if (!doc) doc = this.getDocument();
    var expireDateInMilliseconds = (new Date()).getTime() + (-1 * 1000);
    var cookie = cookieName + "=deleted; ";
    if (path) {
        cookie += "path=" + path + "; ";
    }
    if (domain) {
        cookie += "domain=" + domain + "; ";
    }
    cookie += "expires=" + new Date(expireDateInMilliseconds).toGMTString();
    LOG.debug("Setting cookie to: " + cookie);
    doc.cookie = cookie;
}

/** Try to delete cookie, return false if it didn't work */
BrowserBot.prototype._maybeDeleteCookie = function(cookieName, domain, path, doc) {
    this.deleteCookie(cookieName, domain, path, doc);
    return (!this.getCookieByName(cookieName, doc));
}
    

BrowserBot.prototype._recursivelyDeleteCookieDomains = function(cookieName, domain, path, doc) {
    var deleted = this._maybeDeleteCookie(cookieName, domain, path, doc);
    if (deleted) return true;
    var dotIndex = domain.indexOf(".");
    if (dotIndex == 0) {
        return this._recursivelyDeleteCookieDomains(cookieName, domain.substring(1), path, doc);
    } else if (dotIndex != -1) {
        return this._recursivelyDeleteCookieDomains(cookieName, domain.substring(dotIndex), path, doc);
    } else {
        // No more dots; try just not passing in a domain at all
        return this._maybeDeleteCookie(cookieName, null, path, doc);
    }
}

BrowserBot.prototype._recursivelyDeleteCookie = function(cookieName, domain, path, doc) {
    var slashIndex = path.lastIndexOf("/");
    var finalIndex = path.length-1;
    if (slashIndex == finalIndex) {
        slashIndex--;
    }
    if (slashIndex != -1) {
        deleted = this._recursivelyDeleteCookie(cookieName, domain, path.substring(0, slashIndex+1), doc);
        if (deleted) return true;
    }
    return this._recursivelyDeleteCookieDomains(cookieName, domain, path, doc);
}

BrowserBot.prototype.recursivelyDeleteCookie = function(cookieName, domain, path, win) {
    if (!win) win = this.getCurrentWindow();
    var doc = win.document;
    if (!domain) {
        domain = doc.domain;
    }
    if (!path) {
        path = win.location.pathname;
    }
    var deleted = this._recursivelyDeleteCookie(cookieName, "." + domain, path, doc);
    if (deleted) return;
    // Finally try a null path (Try it last because it's uncommon)
    deleted = this._recursivelyDeleteCookieDomains(cookieName, "." + domain, null, doc);
    if (deleted) return;
    throw new SeleniumError("Couldn't delete cookie " + cookieName);
}

/*
 * Finds an element recursively in frames and nested frames
 * in the specified document, using various lookup protocols
 */
BrowserBot.prototype.findElementRecursive = function(locatorType, locatorString, inDocument, inWindow) {

    var element = this.findElementBy(locatorType, locatorString, inDocument, inWindow);
    if (element != null) {
        return element;
    }

    for (var i = 0; i < inWindow.frames.length; i++) {
        // On some browsers, the document object is undefined for third-party
        // frames.  Make sure the document is valid before continuing.
        if (inWindow.frames[i].document) {
            element = this.findElementRecursive(locatorType, locatorString, inWindow.frames[i].document, inWindow.frames[i]);

            if (element != null) {
                return element;
            }
        }
    }
};

/*
* Finds an element on the current page, using various lookup protocols
*/
BrowserBot.prototype.findElementOrNull = function(locator, win) {
    locator = parse_locator(locator);

    if (win == null) {
        win = this.getCurrentWindow();
    }
    var element = this.findElementRecursive(locator.type, locator.string, win.document, win);

    if (element != null) {
        return this.browserbot.highlight(element);
    }

    // Element was not found by any locator function.
    return null;
};

BrowserBot.prototype.findElement = function(locator, win) {
    var element = this.findElementOrNull(locator, win);
    if (element == null) throw new SeleniumError("Element " + locator + " not found");
    return element;
}

/**
 * In non-IE browsers, getElementById() does not search by name.  Instead, we
 * we search separately by id and name.
 */
BrowserBot.prototype.locateElementByIdentifier = function(identifier, inDocument, inWindow) {
    return BrowserBot.prototype.locateElementById(identifier, inDocument, inWindow)
            || BrowserBot.prototype.locateElementByName(identifier, inDocument, inWindow)
            || null;
};

/**
 * Find the element with id - can't rely on getElementById, coz it returns by name as well in IE..
 */
BrowserBot.prototype.locateElementById = function(identifier, inDocument, inWindow) {
    var element = inDocument.getElementById(identifier);
    if (element && element.getAttribute('id') === identifier) {
        return element;
    }
    else if (browserVersion.isIE || browserVersion.isOpera) {
        // SEL-484
        var xpath = '/descendant::*[@id=' + identifier.quoteForXPath() + ']';
        return BrowserBot.prototype
            .locateElementByXPath(xpath, inDocument, inWindow);
    }
    else {
        return null;
    }
};

/**
 * Find an element by name, refined by (optional) element-filter
 * expressions.
 */
BrowserBot.prototype.locateElementByName = function(locator, document, inWindow) {
    var elements = document.getElementsByTagName("*");

    var filters = locator.split(' ');
    filters[0] = 'name=' + filters[0];

    while (filters.length) {
        var filter = filters.shift();
        elements = this.selectElements(filter, elements, 'value');
    }

    if (elements.length > 0) {
        return elements[0];
    }
    return null;
};

/**
 * Finds an element using by evaluating the specfied string.
 */
BrowserBot.prototype.locateElementByDomTraversal = function(domTraversal, document, window) {

    var browserbot = this.browserbot;
    var element = null;
    try {
        element = eval(domTraversal);
    } catch (e) {
        return null;
    }

    if (!element) {
        return null;
    }

    return element;
};
BrowserBot.prototype.locateElementByDomTraversal.prefix = "dom";

/**
 * Finds an element identified by the xpath expression. Expressions _must_
 * begin with "//".
 */
BrowserBot.prototype.locateElementByXPath = function(xpath, inDocument, inWindow) {
    var results = eval_xpath(xpath, inDocument, {
        returnOnFirstMatch          : true,
        ignoreAttributesWithoutValue: this.ignoreAttributesWithoutValue,
        allowNativeXpath            : this.allowNativeXpath,
        xpathLibrary                : this.xpathLibrary,
        namespaceResolver           : this._namespaceResolver
    });
    return (results.length > 0) ? results[0] : null;
};

BrowserBot.prototype._namespaceResolver = function(prefix) {
    if (prefix == 'html' || prefix == 'xhtml' || prefix == 'x') {
        return 'http://www.w3.org/1999/xhtml';
    } else if (prefix == 'mathml') {
        return 'http://www.w3.org/1998/Math/MathML';
    } else {
        throw new Error("Unknown namespace: " + prefix + ".");
    }
}

/**
 * Returns the number of xpath results.
 */
BrowserBot.prototype.evaluateXPathCount = function(xpath, inDocument) {
    var results = eval_xpath(xpath, inDocument, {
        ignoreAttributesWithoutValue: this.ignoreAttributesWithoutValue,
        allowNativeXpath            : this.allowNativeXpath,
        xpathLibrary                : this.xpathLibrary,
        namespaceResolver           : this._namespaceResolver
    });
    return results.length;
};

/**
 * Finds a link element with text matching the expression supplied. Expressions must
 * begin with "link:".
 */
BrowserBot.prototype.locateElementByLinkText = function(linkText, inDocument, inWindow) {
    var links = inDocument.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
        var element = links[i];
        if (PatternMatcher.matches(linkText, getText(element))) {
            return element;
        }
    }
    return null;
};
BrowserBot.prototype.locateElementByLinkText.prefix = "link";

/**
 * Returns an attribute based on an attribute locator. This is made up of an element locator
 * suffixed with @attribute-name.
 */
BrowserBot.prototype.findAttribute = function(locator) {
    // Split into locator + attributeName
    var attributePos = locator.lastIndexOf("@");
    var elementLocator = locator.slice(0, attributePos);
    var attributeName = locator.slice(attributePos + 1);

    // Find the element.
    var element = this.findElement(elementLocator);

    // Handle missing "class" attribute in IE.
    if (browserVersion.isIE && attributeName == "class") {
        attributeName = "className";
    }

    // Get the attribute value.
    var attributeValue = element.getAttribute(attributeName);
    
    // IE returns an object for the "style" attribute
    if (attributeName == 'style' && typeof(attributeValue) != 'string') {
        attributeValue = attributeValue.cssText;
    }

    return attributeValue ? attributeValue.toString() : null;
};

/*
* Select the specified option and trigger the relevant events of the element.
*/
BrowserBot.prototype.selectOption = function(element, optionToSelect) {
    triggerEvent(element, 'focus', false);
    var changed = false;
    for (var i = 0; i < element.options.length; i++) {
        var option = element.options[i];
        if (option.selected && option != optionToSelect) {
            option.selected = false;
            changed = true;
        }
        else if (!option.selected && option == optionToSelect) {
            option.selected = true;
            changed = true;
        }
    }

    if (changed) {
        triggerEvent(element, 'change', true);
    }
};

/*
* Select the specified option and trigger the relevant events of the element.
*/
BrowserBot.prototype.addSelection = function(element, option) {
    this.checkMultiselect(element);
    triggerEvent(element, 'focus', false);
    if (!option.selected) {
        option.selected = true;
        triggerEvent(element, 'change', true);
    }
};

/*
* Select the specified option and trigger the relevant events of the element.
*/
BrowserBot.prototype.removeSelection = function(element, option) {
    this.checkMultiselect(element);
    triggerEvent(element, 'focus', false);
    if (option.selected) {
        option.selected = false;
        triggerEvent(element, 'change', true);
    }
};

BrowserBot.prototype.checkMultiselect = function(element) {
    if (!element.multiple)
    {
        throw new SeleniumError("Not a multi-select");
    }

};

BrowserBot.prototype.replaceText = function(element, stringValue) {
    triggerEvent(element, 'focus', false);
    triggerEvent(element, 'select', true);
    var maxLengthAttr = element.getAttribute("maxLength");
    var actualValue = stringValue;
    if (maxLengthAttr != null) {
        var maxLength = parseInt(maxLengthAttr);
        if (stringValue.length > maxLength) {
            actualValue = stringValue.substr(0, maxLength);
        }
    }

    if (getTagName(element) == "body") {
        if (element.ownerDocument && element.ownerDocument.designMode) {
            var designMode = new String(element.ownerDocument.designMode).toLowerCase();
            if (designMode = "on") {
                // this must be a rich text control!
                element.innerHTML = actualValue;
            }
        }
    } else {
        element.value = actualValue;
    }
    // DGF this used to be skipped in chrome URLs, but no longer.  Is xpcnativewrappers to blame?
    try {
        triggerEvent(element, 'change', true);
    } catch (e) {}
};

BrowserBot.prototype.submit = function(formElement) {
    var actuallySubmit = true;
    this._modifyElementTarget(formElement);
    if (formElement.onsubmit) {
        if (browserVersion.isHTA) {
            // run the code in the correct window so alerts are handled correctly even in HTA mode
            var win = this.browserbot.getCurrentWindow();
            var now = new Date().getTime();
            var marker = 'marker' + now;
            win[marker] = formElement;
            win.setTimeout("var actuallySubmit = "+marker+".onsubmit();" +
                "if (actuallySubmit) { " +
                    marker+".submit(); " +
                    "if ("+marker+".target && !/^_/.test("+marker+".target)) {"+
                        "window.open('', "+marker+".target);"+
                    "}"+
                "};"+
                marker+"=null", 0);
            // pause for up to 2s while this command runs
            var terminationCondition = function () {
                return !win[marker];
            }
            return Selenium.decorateFunctionWithTimeout(terminationCondition, 2000);
        } else {
            actuallySubmit = formElement.onsubmit();
            if (actuallySubmit) {
                formElement.submit();
                if (formElement.target && !/^_/.test(formElement.target)) {
                    this.browserbot.openWindow('', formElement.target);
                }
            }
        }
    } else {
        formElement.submit();
    }
}

BrowserBot.prototype.clickElement = function(element, clientX, clientY) {
       this._fireEventOnElement("click", element, clientX, clientY);
};

BrowserBot.prototype.doubleClickElement = function(element, clientX, clientY) {
       this._fireEventOnElement("dblclick", element, clientX, clientY);
};

// The contextmenu event is fired when the user right-clicks to open the context menu
BrowserBot.prototype.contextMenuOnElement = function(element, clientX, clientY) {
       this._fireEventOnElement("contextmenu", element, clientX, clientY);
};

BrowserBot.prototype._modifyElementTarget = function(element) {
    if (element.target) {
        if (element.target == "_blank" || /^selenium_blank/.test(element.target) ) {
            var tagName = getTagName(element);
            if (tagName == "a" || tagName == "form") {
                var newTarget = "selenium_blank" + Math.round(100000 * Math.random());
                LOG.warn("Link has target '_blank', which is not supported in Selenium!  Randomizing target to be: " + newTarget);
                this.browserbot.openWindow('', newTarget);
                element.target = newTarget;
            }
        }
    }
}


BrowserBot.prototype._handleClickingImagesInsideLinks = function(targetWindow, element) {
    var itrElement = element;
    while (itrElement != null) {
        if (itrElement.href) {
            targetWindow.location.href = itrElement.href;
            break;
        }
        itrElement = itrElement.parentNode;
    }
}

BrowserBot.prototype._getTargetWindow = function(element) {
    var targetWindow = element.ownerDocument.defaultView;
    if (element.target) {
        targetWindow = this._getFrameFromGlobal(element.target);
    }
    return targetWindow;
}

BrowserBot.prototype._getFrameFromGlobal = function(target) {

    if (target == "_self") {
        return this.getCurrentWindow();
    }
    if (target == "_top") {
        return this.topFrame;
    } else if (target == "_parent") {
        return this.getCurrentWindow().parent;
    } else if (target == "_blank") {
        // TODO should this set cleverer window defaults?
        return this.getCurrentWindow().open('', '_blank');
    }
    var frameElement = this.findElementBy("implicit", target, this.topFrame.document, this.topFrame);
    if (frameElement) {
        return frameElement.contentWindow;
    }
    var win = this.getWindowByName(target);
    if (win) return win;
    return this.getCurrentWindow().open('', target);
}


BrowserBot.prototype.bodyText = function() {
    if (!this.getDocument().body) {
        throw new SeleniumError("Couldn't access document.body.  Is this HTML page fully loaded?");
    }
    return getText(this.getDocument().body);
};

BrowserBot.prototype.getAllButtons = function() {
    var elements = this.getDocument().getElementsByTagName('input');
    var result = [];

    for (var i = 0; i < elements.length; i++) {
        if (elements[i].type == 'button' || elements[i].type == 'submit' || elements[i].type == 'reset') {
            result.push(elements[i].id);
        }
    }

    return result;
};


BrowserBot.prototype.getAllFields = function() {
    var elements = this.getDocument().getElementsByTagName('input');
    var result = [];

    for (var i = 0; i < elements.length; i++) {
        if (elements[i].type == 'text') {
            result.push(elements[i].id);
        }
    }

    return result;
};

BrowserBot.prototype.getAllLinks = function() {
    var elements = this.getDocument().getElementsByTagName('a');
    var result = [];

    for (var i = 0; i < elements.length; i++) {
        result.push(elements[i].id);
    }

    return result;
};

function isDefined(value) {
    return typeof(value) != undefined;
}

BrowserBot.prototype.goBack = function() {
    this.getCurrentWindow().history.back();
};

BrowserBot.prototype.goForward = function() {
    this.getCurrentWindow().history.forward();
};

BrowserBot.prototype.close = function() {
    if (browserVersion.isIE) {
        // fix "do you want to close this window" warning in IE
        // You can only close windows that you have opened.
        // So, let's "open" it.
        try {
            this.topFrame.name=new Date().getTime();
            window.open("", this.topFrame.name, "");
            this.topFrame.close();
            return;
        } catch (e) {}
    }
    if (browserVersion.isChrome || browserVersion.isSafari || browserVersion.isOpera) {
        this.topFrame.close();
    } else {
        this.getCurrentWindow().eval("window.top.close();");
    }
};

BrowserBot.prototype.refresh = function() {
    this.getCurrentWindow().location.reload(true);
};

/**
 * Refine a list of elements using a filter.
 */
BrowserBot.prototype.selectElementsBy = function(filterType, filter, elements) {
    var filterFunction = BrowserBot.filterFunctions[filterType];
    if (! filterFunction) {
        throw new SeleniumError("Unrecognised element-filter type: '" + filterType + "'");
    }

    return filterFunction(filter, elements);
};

BrowserBot.filterFunctions = {};

BrowserBot.filterFunctions.name = function(name, elements) {
    var selectedElements = [];
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].name === name) {
            selectedElements.push(elements[i]);
        }
    }
    return selectedElements;
};

BrowserBot.filterFunctions.value = function(value, elements) {
    var selectedElements = [];
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].value === value) {
            selectedElements.push(elements[i]);
        }
    }
    return selectedElements;
};

BrowserBot.filterFunctions.index = function(index, elements) {
    index = Number(index);
    if (isNaN(index) || index < 0) {
        throw new SeleniumError("Illegal Index: " + index);
    }
    if (elements.length <= index) {
        throw new SeleniumError("Index out of range: " + index);
    }
    return [elements[index]];
};

BrowserBot.prototype.selectElements = function(filterExpr, elements, defaultFilterType) {

    var filterType = (defaultFilterType || 'value');

    // If there is a filter prefix, use the specified strategy
    var result = filterExpr.match(/^([A-Za-z]+)=(.+)/);
    if (result) {
        filterType = result[1].toLowerCase();
        filterExpr = result[2];
    }

    return this.selectElementsBy(filterType, filterExpr, elements);
};

/**
 * Find an element by class
 */
BrowserBot.prototype.locateElementByClass = function(locator, document) {
    return elementFindFirstMatchingChild(document,
            function(element) {
                return element.className == locator
            }
            );
}

/**
 * Find an element by alt
 */
BrowserBot.prototype.locateElementByAlt = function(locator, document) {
    return elementFindFirstMatchingChild(document,
            function(element) {
                return element.alt == locator
            }
            );
}

/**
 * Find an element by css selector
 */
BrowserBot.prototype.locateElementByCss = function(locator, document) {
    var elements = eval_css(locator, document);
    if (elements.length != 0)
        return elements[0];
    return null;
}

/**
 * This function is responsible for mapping a UI specifier string to an element
 * on the page, and returning it. If no element is found, null is returned.
 * Returning null on failure to locate the element is part of the undocumented
 * API for locator strategies.
 */
BrowserBot.prototype.locateElementByUIElement = function(locator, inDocument) {
    // offset locators are delimited by "->", which is much simpler than the
    // previous scheme involving detecting the close-paren.
    var locators = locator.split(/->/, 2);
    
    var locatedElement = null;
    var pageElements = UIMap.getInstance()
        .getPageElements(locators[0], inDocument);
    
    if (locators.length > 1) {
        for (var i = 0; i < pageElements.length; ++i) {
            var locatedElements = eval_locator(locators[1], inDocument,
                pageElements[i]);
            if (locatedElements.length) {
                locatedElement = locatedElements[0];
                break;
            }
        }
    }
    else if (pageElements.length) {
        locatedElement = pageElements[0];
    }
    
    return locatedElement;
}

BrowserBot.prototype.locateElementByUIElement.prefix = 'ui';

// define a function used to compare the result of a close UI element
// match with the actual interacted element. If they are close enough
// according to the heuristic, consider them a match.
/**
 * A heuristic function for comparing a node with a target node. Typically the
 * node is specified in a UI element definition, while the target node is
 * returned by the recorder as the leaf element which had some event enacted
 * upon it. This particular heuristic covers the case where the anchor element
 * contains other inline tags, such as "em" or "img".
 *
 * @param node    the node being compared to the target node
 * @param target  the target node
 * @return        true if node equals target, or if node is a link
 *                element and target is its descendant, or if node has
 *                an onclick attribute and target is its descendant.
 *                False otherwise.
 */
BrowserBot.prototype.locateElementByUIElement.is_fuzzy_match = function(node, target) {
    try {
        var isMatch = (
            (node == target) ||
            ((node.nodeName == 'A' || node.onclick) && is_ancestor(node, target))
        );
        return isMatch;
    }
    catch (e) {
        return false;
    }
};

/*****************************************************************/
/* BROWSER-SPECIFIC FUNCTIONS ONLY AFTER THIS LINE */

function MozillaBrowserBot(frame) {
    BrowserBot.call(this, frame);
}
objectExtend(MozillaBrowserBot.prototype, BrowserBot.prototype);

function KonquerorBrowserBot(frame) {
    BrowserBot.call(this, frame);
}
objectExtend(KonquerorBrowserBot.prototype, BrowserBot.prototype);

KonquerorBrowserBot.prototype.setIFrameLocation = function(iframe, location) {
    // Window doesn't fire onload event when setting src to the current value,
    // so we set it to blank first.
    iframe.src = "about:blank";
    iframe.src = location;
};

KonquerorBrowserBot.prototype.setOpenLocation = function(win, loc) {
    // Window doesn't fire onload event when setting src to the current value,
    // so we just refresh in that case instead.
    loc = absolutify(loc, this.baseUrl);
    loc = canonicalize(loc);
    var startUrl = win.location.href;
    if ("about:blank" != win.location.href) {
        var startLoc = parseUrl(win.location.href);
        startLoc.hash = null;
        var startUrl = reassembleLocation(startLoc);
    }
    LOG.debug("startUrl="+startUrl);
    LOG.debug("win.location.href="+win.location.href);
    LOG.debug("loc="+loc);
    if (startUrl == loc) {
        LOG.debug("opening exact same location");
        this.refresh();
    } else {
        LOG.debug("locations differ");
        win.location.href = loc;
    }
    // force the current polling thread to detect a page load
    var marker = this.isPollingForLoad(win);
    if (marker) {
        delete win.location[marker];
    }
};

KonquerorBrowserBot.prototype._isSameDocument = function(originalDocument, currentDocument) {
    // under Konqueror, there may be this case:
    // originalDocument and currentDocument are different objects
    // while their location are same.
    if (originalDocument) {
        return originalDocument.location == currentDocument.location
    } else {
        return originalDocument === currentDocument;
    }
};

function SafariBrowserBot(frame) {
    BrowserBot.call(this, frame);
}
objectExtend(SafariBrowserBot.prototype, BrowserBot.prototype);

SafariBrowserBot.prototype.setIFrameLocation = KonquerorBrowserBot.prototype.setIFrameLocation;
SafariBrowserBot.prototype.setOpenLocation = KonquerorBrowserBot.prototype.setOpenLocation;


function OperaBrowserBot(frame) {
    BrowserBot.call(this, frame);
}
objectExtend(OperaBrowserBot.prototype, BrowserBot.prototype);
OperaBrowserBot.prototype.setIFrameLocation = function(iframe, location) {
    if (iframe.src == location) {
        iframe.src = location + '?reload';
    } else {
        iframe.src = location;
    }
}

function IEBrowserBot(frame) {
    BrowserBot.call(this, frame);
}
objectExtend(IEBrowserBot.prototype, BrowserBot.prototype);

IEBrowserBot.prototype._handleClosedSubFrame = function(testWindow, doNotModify) {
    if (this.proxyInjectionMode) {
        return testWindow;
    }

    try {
        testWindow.location.href;
        this.permDenied = 0;
    } catch (e) {
        this.permDenied++;
    }
    if (this._windowClosed(testWindow) || this.permDenied > 4) {
        if (this.isSubFrameSelected) {
            LOG.warn("Current subframe appears to have closed; selecting top frame");
            this.selectFrame("relative=top");
            return this.getCurrentWindow(doNotModify);
        } else {
            var closedError = new SeleniumError("Current window or frame is closed!");
            closedError.windowClosed = true;
            throw closedError;
        }
    }
    return testWindow;
};

IEBrowserBot.prototype.modifyWindowToRecordPopUpDialogs = function(windowToModify, browserBot) {
    BrowserBot.prototype.modifyWindowToRecordPopUpDialogs(windowToModify, browserBot);

    // we will call the previous version of this method from within our own interception
    oldShowModalDialog = windowToModify.showModalDialog;

    windowToModify.showModalDialog = function(url, args, features) {
        // Get relative directory to where TestRunner.html lives
        // A risky assumption is that the user's TestRunner is named TestRunner.html
        var doc_location = document.location.toString();
        var end_of_base_ref = doc_location.indexOf('TestRunner.html');
        var base_ref = doc_location.substring(0, end_of_base_ref);
        var runInterval = '';
        
        // Only set run interval if options is defined
        if (typeof(window.runOptions) != 'undefined') {
            runInterval = "&runInterval=" + runOptions.runInterval;
        }
            
        var testRunnerURL = "TestRunner.html?auto=true&singletest=" 
            + escape(browserBot.modalDialogTest)
            + "&autoURL=" 
            + escape(url) 
            + runInterval;
        var fullURL = base_ref + testRunnerURL;
        browserBot.modalDialogTest = null;

        // If using proxy injection mode
        if (this.proxyInjectionMode) {
            var sessionId = runOptions.getSessionId();
            if (sessionId == undefined) {
                sessionId = injectedSessionId;
            }
            if (sessionId != undefined) {
                LOG.debug("Invoking showModalDialog and injecting URL " + fullURL);
            }
            fullURL = url;
        }
        var returnValue = oldShowModalDialog(fullURL, args, features);
        return returnValue;
    };
};

IEBrowserBot.prototype.modifySeparateTestWindowToDetectPageLoads = function(windowObject) {
    this.pageUnloading = false;
    var self = this;
    var pageUnloadDetector = function() {
        self.pageUnloading = true;
    };
    windowObject.attachEvent("onbeforeunload", pageUnloadDetector);
    BrowserBot.prototype.modifySeparateTestWindowToDetectPageLoads.call(this, windowObject);
};

IEBrowserBot.prototype.pollForLoad = function(loadFunction, windowObject, originalDocument, originalLocation, originalHref, marker) {
    LOG.debug("IEBrowserBot.pollForLoad: " + marker);
    if (!this.permDeniedCount[marker]) this.permDeniedCount[marker] = 0;
    BrowserBot.prototype.pollForLoad.call(this, loadFunction, windowObject, originalDocument, originalLocation, originalHref, marker);
    if (this.pageLoadError) {
        if (this.pageUnloading) {
            var self = this;
            LOG.debug("pollForLoad UNLOADING (" + marker + "): caught exception while firing events on unloading page: " + this.pageLoadError.message);
            this.reschedulePoller(loadFunction, windowObject, originalDocument, originalLocation, originalHref, marker);
            this.pageLoadError = null;
            return;
        } else if (((this.pageLoadError.message == "Permission denied") || (/^Access is denied/.test(this.pageLoadError.message)))
                && this.permDeniedCount[marker]++ < 8) {
            if (this.permDeniedCount[marker] > 4) {
                var canAccessThisWindow;
                var canAccessCurrentlySelectedWindow;
                try {
                    windowObject.location.href;
                    canAccessThisWindow = true;
                } catch (e) {}
                try {
                    this.getCurrentWindow(true).location.href;
                    canAccessCurrentlySelectedWindow = true;
                } catch (e) {}
                if (canAccessCurrentlySelectedWindow & !canAccessThisWindow) {
                    LOG.debug("pollForLoad (" + marker + ") ABORTING: " + this.pageLoadError.message + " (" + this.permDeniedCount[marker] + "), but the currently selected window is fine");
                    // returning without rescheduling
                    this.pageLoadError = null;
                    return;
                }
            }

            var self = this;
            LOG.debug("pollForLoad (" + marker + "): " + this.pageLoadError.message + " (" + this.permDeniedCount[marker] + "), waiting to see if it goes away");
            this.reschedulePoller(loadFunction, windowObject, originalDocument, originalLocation, originalHref, marker);
            this.pageLoadError = null;
            return;
        }
        //handy for debugging!
        //throw this.pageLoadError;
    }
};

IEBrowserBot.prototype._windowClosed = function(win) {
    try {
        var c = win.closed;
        // frame windows claim to be non-closed when their parents are closed
        // but you can't access their document objects in that case
        if (!c) {
            try {
                win.document;
            } catch (de) {
                if (de.message == "Permission denied") {
                    // the window is probably unloading, which means it's probably not closed yet
                    return false;
                }
                else if (/^Access is denied/.test(de.message)) {
                    // rare variation on "Permission denied"?
                    LOG.debug("IEBrowserBot.windowClosed: got " + de.message + " (this.pageUnloading=" + this.pageUnloading + "); assuming window is unloading, probably not closed yet");
                    return false;
                } else {
                    // this is probably one of those frame window situations
                    LOG.debug("IEBrowserBot.windowClosed: couldn't read win.document, assume closed: " + de.message + " (this.pageUnloading=" + this.pageUnloading + ")");
                    return true;
                }
            }
        }
        if (c == null) {
            LOG.debug("IEBrowserBot.windowClosed: win.closed was null, assuming closed");
            return true;
        }
        return c;
    } catch (e) {
        LOG.debug("IEBrowserBot._windowClosed: Got an exception trying to read win.closed; we'll have to take a guess!");

        if (browserVersion.isHTA) {
            if (e.message == "Permission denied") {
                // the window is probably unloading, which means it's not closed yet
                return false;
            } else {
                // there's a good chance that we've lost contact with the window object if it is closed
                return true;
            }
        } else {
            // the window is probably unloading, which means it's not closed yet
            return false;
        }
    }
};

/**
 * In IE, getElementById() also searches by name - this is an optimisation for IE.
 */
IEBrowserBot.prototype.locateElementByIdentifer = function(identifier, inDocument, inWindow) {
    return inDocument.getElementById(identifier);
};

SafariBrowserBot.prototype.modifyWindowToRecordPopUpDialogs = function(windowToModify, browserBot) {
    BrowserBot.prototype.modifyWindowToRecordPopUpDialogs(windowToModify, browserBot);

    var originalOpen = windowToModify.open;
    /*
     * Safari seems to be broken, so that when we manually trigger the onclick method
     * of a button/href, any window.open calls aren't resolved relative to the app location.
     * So here we replace the open() method with one that does resolve the url correctly.
     */
    windowToModify.open = function(url, windowName, windowFeatures, replaceFlag) {

        if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/")) {
            return originalOpen(url, windowName, windowFeatures, replaceFlag);
        }

        // Reduce the current path to the directory
        var currentPath = windowToModify.location.pathname || "/";
        currentPath = currentPath.replace(/\/[^\/]*$/, "/");

        // Remove any leading "./" from the new url.
        url = url.replace(/^\.\//, "");

        newUrl = currentPath + url;

        var openedWindow = originalOpen(newUrl, windowName, windowFeatures, replaceFlag);
        LOG.debug("window.open call intercepted; window ID (which you can use with selectWindow()) is \"" +  windowName + "\"");
        if (windowName!=null) {
            openedWindow["seleniumWindowName"] = windowName;
        }
        return openedWindow;
    };
};

MozillaBrowserBot.prototype._fireEventOnElement = function(eventType, element, clientX, clientY) {
    var win = this.getCurrentWindow();
    triggerEvent(element, 'focus', false);

    // Add an event listener that detects if the default action has been prevented.
    // (This is caused by a javascript onclick handler returning false)
    // we capture the whole event, rather than the getPreventDefault() state at the time,
    // because we need to let the entire event bubbling and capturing to go through
    // before making a decision on whether we should force the href
    var savedEvent = null;

    element.addEventListener(eventType, function(evt) {
        savedEvent = evt;
    }, false);

    this._modifyElementTarget(element);

    // Trigger the event.
    this.browserbot.triggerMouseEvent(element, eventType, true, clientX, clientY);

    if (this._windowClosed(win)) {
        return;
    }

    // Perform the link action if preventDefault was set.
    // In chrome URL, the link action is already executed by triggerMouseEvent.
    if (!browserVersion.isChrome && savedEvent != null && !savedEvent.getPreventDefault()) {
        var targetWindow = this.browserbot._getTargetWindow(element);
        if (element.href) {
            targetWindow.location.href = element.href;
        } else {
            this.browserbot._handleClickingImagesInsideLinks(targetWindow, element);
        }
    }

};


OperaBrowserBot.prototype._fireEventOnElement = function(eventType, element, clientX, clientY) {
    var win = this.getCurrentWindow();
    triggerEvent(element, 'focus', false);

    this._modifyElementTarget(element);

    // Trigger the click event.
    this.browserbot.triggerMouseEvent(element, eventType, true, clientX, clientY);

    if (this._windowClosed(win)) {
        return;
    }

};


KonquerorBrowserBot.prototype._fireEventOnElement = function(eventType, element, clientX, clientY) {
    var win = this.getCurrentWindow();
    triggerEvent(element, 'focus', false);

    this._modifyElementTarget(element);

    if (element[eventType]) {
        element[eventType]();
    }
    else {
        this.browserbot.triggerMouseEvent(element, eventType, true, clientX, clientY);
    }

    if (this._windowClosed(win)) {
        return;
    }

};

SafariBrowserBot.prototype._fireEventOnElement = function(eventType, element, clientX, clientY) {
    triggerEvent(element, 'focus', false);
    var wasChecked = element.checked;

    this._modifyElementTarget(element);

    // For form element it is simple.
    if (element[eventType]) {
        element[eventType]();
    }
    // For links and other elements, event emulation is required.
    else {
        var targetWindow = this.browserbot._getTargetWindow(element);
        // todo: deal with anchors?
        this.browserbot.triggerMouseEvent(element, eventType, true, clientX, clientY);

    }

};

SafariBrowserBot.prototype.refresh = function() {
    var win = this.getCurrentWindow();
    if (win.location.hash) {
        // DGF Safari refuses to refresh when there's a hash symbol in the URL
        win.location.hash = "";
        var actuallyReload = function() {
            win.location.reload(true);
        }
        window.setTimeout(actuallyReload, 1);
    } else {
        win.location.reload(true);
    }
};

IEBrowserBot.prototype._fireEventOnElement = function(eventType, element, clientX, clientY) {
    var win = this.getCurrentWindow();
    triggerEvent(element, 'focus', false);

    var wasChecked = element.checked;

    // Set a flag that records if the page will unload - this isn't always accurate, because
    // <a href="javascript:alert('foo'):"> triggers the onbeforeunload event, even thought the page won't unload
    var pageUnloading = false;
    var pageUnloadDetector = function() {
        pageUnloading = true;
    };
    win.attachEvent("onbeforeunload", pageUnloadDetector);
    this._modifyElementTarget(element);
    if (element[eventType]) {
        element[eventType]();
    }
    else {
        this.browserbot.triggerMouseEvent(element, eventType, true, clientX, clientY);
    }


    // If the page is going to unload - still attempt to fire any subsequent events.
    // However, we can't guarantee that the page won't unload half way through, so we need to handle exceptions.
    try {
        win.detachEvent("onbeforeunload", pageUnloadDetector);

        if (this._windowClosed(win)) {
            return;
        }

        // Onchange event is not triggered automatically in IE.
        if (isDefined(element.checked) && wasChecked != element.checked) {
            triggerEvent(element, 'change', true);
        }

    }
    catch (e) {
        // If the page is unloading, we may get a "Permission denied" or "Unspecified error".
        // Just ignore it, because the document may have unloaded.
        if (pageUnloading) {
            LOG.logHook = function() {
            };
            LOG.warn("Caught exception when firing events on unloading page: " + e.message);
            return;
        }
        throw e;
    }
};
// Copyright 2005 Google Inc.
// All Rights Reserved
//
// An XPath parser and evaluator written in JavaScript. The
// implementation is complete except for functions handling
// namespaces.
//
// Reference: [XPATH] XPath Specification
// <http://www.w3.org/TR/1999/REC-xpath-19991116>.
//
//
// The API of the parser has several parts:
//
// 1. The parser function xpathParse() that takes a string and returns
// an expession object.
//
// 2. The expression object that has an evaluate() method to evaluate the
// XPath expression it represents. (It is actually a hierarchy of
// objects that resembles the parse tree, but an application will call
// evaluate() only on the top node of this hierarchy.)
//
// 3. The context object that is passed as an argument to the evaluate()
// method, which represents the DOM context in which the expression is
// evaluated.
//
// 4. The value object that is returned from evaluate() and represents
// values of the different types that are defined by XPath (number,
// string, boolean, and node-set), and allows to convert between them.
//
// These parts are near the top of the file, the functions and data
// that are used internally follow after them.
//
//
// Author: Steffen Meschkat <mesch@google.com>


// The entry point for the parser.
//
// @param expr a string that contains an XPath expression.
// @return an expression object that can be evaluated with an
// expression context.

function xpathParse(expr) {
  xpathLog('parse ' + expr);
  xpathParseInit();

  var cached = xpathCacheLookup(expr);
  if (cached) {
    xpathLog(' ... cached');
    return cached;
  }

  // Optimize for a few common cases: simple attribute node tests
  // (@id), simple element node tests (page), variable references
  // ($address), numbers (4), multi-step path expressions where each
  // step is a plain element node test
  // (page/overlay/locations/location).

  if (expr.match(/^(\$|@)?\w+$/i)) {
    var ret = makeSimpleExpr(expr);
    xpathParseCache[expr] = ret;
    xpathLog(' ... simple');
    return ret;
  }

  if (expr.match(/^\w+(\/\w+)*$/i)) {
    var ret = makeSimpleExpr2(expr);
    xpathParseCache[expr] = ret;
    xpathLog(' ... simple 2');
    return ret;
  }

  var cachekey = expr; // expr is modified during parse

  var stack = [];
  var ahead = null;
  var previous = null;
  var done = false;

  var parse_count = 0;
  var lexer_count = 0;
  var reduce_count = 0;

  while (!done) {
    parse_count++;
    expr = expr.replace(/^\s*/, '');
    previous = ahead;
    ahead = null;

    var rule = null;
    var match = '';
    for (var i = 0; i < xpathTokenRules.length; ++i) {
      var result = xpathTokenRules[i].re.exec(expr);
      lexer_count++;
      if (result && result.length > 0 && result[0].length > match.length) {
        rule = xpathTokenRules[i];
        match = result[0];
        break;
      }
    }

    // Special case: allow operator keywords to be element and
    // variable names.

    // NOTE(mesch): The parser resolves conflicts by looking ahead,
    // and this is the only case where we look back to
    // disambiguate. So this is indeed something different, and
    // looking back is usually done in the lexer (via states in the
    // general case, called "start conditions" in flex(1)). Also,the
    // conflict resolution in the parser is not as robust as it could
    // be, so I'd like to keep as much off the parser as possible (all
    // these precedence values should be computed from the grammar
    // rules and possibly associativity declarations, as in bison(1),
    // and not explicitly set.

    if (rule &&
        (rule == TOK_DIV ||
         rule == TOK_MOD ||
         rule == TOK_AND ||
         rule == TOK_OR) &&
        (!previous ||
         previous.tag == TOK_AT ||
         previous.tag == TOK_DSLASH ||
         previous.tag == TOK_SLASH ||
         previous.tag == TOK_AXIS ||
         previous.tag == TOK_DOLLAR)) {
      rule = TOK_QNAME;
    }

    if (rule) {
      expr = expr.substr(match.length);
      xpathLog('token: ' + match + ' -- ' + rule.label);
      ahead = {
        tag: rule,
        match: match,
        prec: rule.prec ?  rule.prec : 0, // || 0 is removed by the compiler
        expr: makeTokenExpr(match)
      };

    } else {
      xpathLog('DONE');
      done = true;
    }

    while (xpathReduce(stack, ahead)) {
      reduce_count++;
      xpathLog('stack: ' + stackToString(stack));
    }
  }

  xpathLog('stack: ' + stackToString(stack));

  // DGF any valid XPath should "reduce" to a single Expr token
  if (stack.length != 1) {
    throw 'XPath parse error ' + cachekey + ':\n' + stackToString(stack);
  }

  var result = stack[0].expr;
  xpathParseCache[cachekey] = result;

  xpathLog('XPath parse: ' + parse_count + ' / ' +
           lexer_count + ' / ' + reduce_count);

  return result;
}

var xpathParseCache = {};

function xpathCacheLookup(expr) {
  return xpathParseCache[expr];
}

/*DGF xpathReduce is where the magic happens in this parser.
Skim down to the bottom of this file to find the table of 
grammatical rules and precedence numbers, "The productions of the grammar".

The idea here
is that we want to take a stack of tokens and apply
grammatical rules to them, "reducing" them to higher-level
tokens.  Ultimately, any valid XPath should reduce to exactly one
"Expr" token.

Reduce too early or too late and you'll have two tokens that can't reduce
to single Expr.  For example, you may hastily reduce a qname that
should name a function, incorrectly treating it as a tag name.
Or you may reduce too late, accidentally reducing the last part of the
XPath into a top-level "Expr" that won't reduce with earlier parts of
the XPath.

A "cand" is a grammatical rule candidate, with a given precedence
number.  "ahead" is the upcoming token, which also has a precedence
number.  If the token has a higher precedence number than
the rule candidate, we'll "shift" the token onto the token stack,
instead of immediately applying the rule candidate.

Some tokens have left associativity, in which case we shift when they
have LOWER precedence than the candidate.
*/
function xpathReduce(stack, ahead) {
  var cand = null;

  if (stack.length > 0) {
    var top = stack[stack.length-1];
    var ruleset = xpathRules[top.tag.key];

    if (ruleset) {
      for (var i = 0; i < ruleset.length; ++i) {
        var rule = ruleset[i];
        var match = xpathMatchStack(stack, rule[1]);
        if (match.length) {
          cand = {
            tag: rule[0],
            rule: rule,
            match: match
          };
          cand.prec = xpathGrammarPrecedence(cand);
          break;
        }
      }
    }
  }

  var ret;
  if (cand && (!ahead || cand.prec > ahead.prec ||
               (ahead.tag.left && cand.prec >= ahead.prec))) {
    for (var i = 0; i < cand.match.matchlength; ++i) {
      stack.pop();
    }

    xpathLog('reduce ' + cand.tag.label + ' ' + cand.prec +
             ' ahead ' + (ahead ? ahead.tag.label + ' ' + ahead.prec +
                          (ahead.tag.left ? ' left' : '')
                          : ' none '));

    var matchexpr = mapExpr(cand.match, function(m) { return m.expr; });
    xpathLog('going to apply ' + cand.rule[3].toString());
    cand.expr = cand.rule[3].apply(null, matchexpr);

    stack.push(cand);
    ret = true;

  } else {
    if (ahead) {
      xpathLog('shift ' + ahead.tag.label + ' ' + ahead.prec +
               (ahead.tag.left ? ' left' : '') +
               ' over ' + (cand ? cand.tag.label + ' ' +
                           cand.prec : ' none'));
      stack.push(ahead);
    }
    ret = false;
  }
  return ret;
}

function xpathMatchStack(stack, pattern) {

  // NOTE(mesch): The stack matches for variable cardinality are
  // greedy but don't do backtracking. This would be an issue only
  // with rules of the form A* A, i.e. with an element with variable
  // cardinality followed by the same element. Since that doesn't
  // occur in the grammar at hand, all matches on the stack are
  // unambiguous.

  var S = stack.length;
  var P = pattern.length;
  var p, s;
  var match = [];
  match.matchlength = 0;
  var ds = 0;
  for (p = P - 1, s = S - 1; p >= 0 && s >= 0; --p, s -= ds) {
    ds = 0;
    var qmatch = [];
    if (pattern[p] == Q_MM) {
      p -= 1;
      match.push(qmatch);
      while (s - ds >= 0 && stack[s - ds].tag == pattern[p]) {
        qmatch.push(stack[s - ds]);
        ds += 1;
        match.matchlength += 1;
      }

    } else if (pattern[p] == Q_01) {
      p -= 1;
      match.push(qmatch);
      while (s - ds >= 0 && ds < 2 && stack[s - ds].tag == pattern[p]) {
        qmatch.push(stack[s - ds]);
        ds += 1;
        match.matchlength += 1;
      }

    } else if (pattern[p] == Q_1M) {
      p -= 1;
      match.push(qmatch);
      if (stack[s].tag == pattern[p]) {
        while (s - ds >= 0 && stack[s - ds].tag == pattern[p]) {
          qmatch.push(stack[s - ds]);
          ds += 1;
          match.matchlength += 1;
        }
      } else {
        return [];
      }

    } else if (stack[s].tag == pattern[p]) {
      match.push(stack[s]);
      ds += 1;
      match.matchlength += 1;

    } else {
      return [];
    }

    reverseInplace(qmatch);
    qmatch.expr = mapExpr(qmatch, function(m) { return m.expr; });
  }

  reverseInplace(match);

  if (p == -1) {
    return match;

  } else {
    return [];
  }
}

function xpathTokenPrecedence(tag) {
  return tag.prec || 2;
}

function xpathGrammarPrecedence(frame) {
  var ret = 0;

  if (frame.rule) { /* normal reduce */
    if (frame.rule.length >= 3 && frame.rule[2] >= 0) {
      ret = frame.rule[2];

    } else {
      for (var i = 0; i < frame.rule[1].length; ++i) {
        var p = xpathTokenPrecedence(frame.rule[1][i]);
        ret = Math.max(ret, p);
      }
    }
  } else if (frame.tag) { /* TOKEN match */
    ret = xpathTokenPrecedence(frame.tag);

  } else if (frame.length) { /* Q_ match */
    for (var j = 0; j < frame.length; ++j) {
      var p = xpathGrammarPrecedence(frame[j]);
      ret = Math.max(ret, p);
    }
  }

  return ret;
}

function stackToString(stack) {
  var ret = '';
  for (var i = 0; i < stack.length; ++i) {
    if (ret) {
      ret += '\n';
    }
    ret += stack[i].tag.label;
  }
  return ret;
}


// XPath expression evaluation context. An XPath context consists of a
// DOM node, a list of DOM nodes that contains this node, a number
// that represents the position of the single node in the list, and a
// current set of variable bindings. (See XPath spec.)
//
// The interface of the expression context:
//
//   Constructor -- gets the node, its position, the node set it
//   belongs to, and a parent context as arguments. The parent context
//   is used to implement scoping rules for variables: if a variable
//   is not found in the current context, it is looked for in the
//   parent context, recursively. Except for node, all arguments have
//   default values: default position is 0, default node set is the
//   set that contains only the node, and the default parent is null.
//
//     Notice that position starts at 0 at the outside interface;
//     inside XPath expressions this shows up as position()=1.
//
//   clone() -- creates a new context with the current context as
//   parent. If passed as argument to clone(), the new context has a
//   different node, position, or node set. What is not passed is
//   inherited from the cloned context.
//
//   setVariable(name, expr) -- binds given XPath expression to the
//   name.
//
//   getVariable(name) -- what the name says.
//
//   setNode(position) -- sets the context to the node at the given
//   position. Needed to implement scoping rules for variables in
//   XPath. (A variable is visible to all subsequent siblings, not
//   only to its children.)
//
//   set/isCaseInsensitive -- specifies whether node name tests should
//   be case sensitive.  If you're executing xpaths against a regular
//   HTML DOM, you probably don't want case-sensitivity, because
//   browsers tend to disagree about whether elements & attributes
//   should be upper/lower case.  If you're running xpaths in an
//   XSLT instance, you probably DO want case sensitivity, as per the
//   XSL spec.
//
//   set/isReturnOnFirstMatch -- whether XPath evaluation should quit as soon
//   as a result is found. This is an optimization that might make sense if you
//   only care about the first result.
//
//   set/isIgnoreNonElementNodesForNTA -- whether to ignore non-element nodes
//   when evaluating the "node()" any node test. While technically this is
//   contrary to the XPath spec, practically it can enhance performance
//   significantly, and makes sense if you a) use "node()" when you mean "*",
//   and b) use "//" when you mean "/descendant::*/".

function ExprContext(node, opt_position, opt_nodelist, opt_parent,
  opt_caseInsensitive, opt_ignoreAttributesWithoutValue,
  opt_returnOnFirstMatch, opt_ignoreNonElementNodesForNTA)
{
  this.node = node;
  this.position = opt_position || 0;
  this.nodelist = opt_nodelist || [ node ];
  this.variables = {};
  this.parent = opt_parent || null;
  this.caseInsensitive = opt_caseInsensitive || false;
  this.ignoreAttributesWithoutValue = opt_ignoreAttributesWithoutValue || false;
  this.returnOnFirstMatch = opt_returnOnFirstMatch || false;
  this.ignoreNonElementNodesForNTA = opt_ignoreNonElementNodesForNTA || false;
  if (opt_parent) {
    this.root = opt_parent.root;
  } else if (this.node.nodeType == DOM_DOCUMENT_NODE) {
    // NOTE(mesch): DOM Spec stipulates that the ownerDocument of a
    // document is null. Our root, however is the document that we are
    // processing, so the initial context is created from its document
    // node, which case we must handle here explcitly.
    this.root = node;
  } else {
    this.root = node.ownerDocument;
  }
}

ExprContext.prototype.clone = function(opt_node, opt_position, opt_nodelist) {
  return new ExprContext(
      opt_node || this.node,
      typeof opt_position != 'undefined' ? opt_position : this.position,
      opt_nodelist || this.nodelist, this, this.caseInsensitive,
      this.ignoreAttributesWithoutValue, this.returnOnFirstMatch,
      this.ignoreNonElementNodesForNTA);
};

ExprContext.prototype.setVariable = function(name, value) {
  if (value instanceof StringValue || value instanceof BooleanValue || 
    value instanceof NumberValue || value instanceof NodeSetValue) {
    this.variables[name] = value;
    return;
  }
  if ('true' === value) {
    this.variables[name] = new BooleanValue(true);
  } else if ('false' === value) {
    this.variables[name] = new BooleanValue(false);
  } else if (TOK_NUMBER.re.test(value)) {
    this.variables[name] = new NumberValue(value);
  } else {
    // DGF What if it's null?
    this.variables[name] = new StringValue(value);
  }
};

ExprContext.prototype.getVariable = function(name) {
  if (typeof this.variables[name] != 'undefined') {
    return this.variables[name];

  } else if (this.parent) {
    return this.parent.getVariable(name);

  } else {
    return null;
  }
};

ExprContext.prototype.setNode = function(position) {
  this.node = this.nodelist[position];
  this.position = position;
};

ExprContext.prototype.contextSize = function() {
  return this.nodelist.length;
};

ExprContext.prototype.isCaseInsensitive = function() {
  return this.caseInsensitive;
};

ExprContext.prototype.setCaseInsensitive = function(caseInsensitive) {
  return this.caseInsensitive = caseInsensitive;
};

ExprContext.prototype.isIgnoreAttributesWithoutValue = function() {
  return this.ignoreAttributesWithoutValue;
};

ExprContext.prototype.setIgnoreAttributesWithoutValue = function(ignore) {
  return this.ignoreAttributesWithoutValue = ignore;
};

ExprContext.prototype.isReturnOnFirstMatch = function() {
  return this.returnOnFirstMatch;
};

ExprContext.prototype.setReturnOnFirstMatch = function(returnOnFirstMatch) {
  return this.returnOnFirstMatch = returnOnFirstMatch;
};

ExprContext.prototype.isIgnoreNonElementNodesForNTA = function() {
  return this.ignoreNonElementNodesForNTA;
};

ExprContext.prototype.setIgnoreNonElementNodesForNTA = function(ignoreNonElementNodesForNTA) {
  return this.ignoreNonElementNodesForNTA = ignoreNonElementNodesForNTA;
};

// XPath expression values. They are what XPath expressions evaluate
// to. Strangely, the different value types are not specified in the
// XPath syntax, but only in the semantics, so they don't show up as
// nonterminals in the grammar. Yet, some expressions are required to
// evaluate to particular types, and not every type can be coerced
// into every other type. Although the types of XPath values are
// similar to the types present in JavaScript, the type coercion rules
// are a bit peculiar, so we explicitly model XPath types instead of
// mapping them onto JavaScript types. (See XPath spec.)
//
// The four types are:
//
//   StringValue
//
//   NumberValue
//
//   BooleanValue
//
//   NodeSetValue
//
// The common interface of the value classes consists of methods that
// implement the XPath type coercion rules:
//
//   stringValue() -- returns the value as a JavaScript String,
//
//   numberValue() -- returns the value as a JavaScript Number,
//
//   booleanValue() -- returns the value as a JavaScript Boolean,
//
//   nodeSetValue() -- returns the value as a JavaScript Array of DOM
//   Node objects.
//

function StringValue(value) {
  this.value = value;
  this.type = 'string';
}

StringValue.prototype.stringValue = function() {
  return this.value;
}

StringValue.prototype.booleanValue = function() {
  return this.value.length > 0;
}

StringValue.prototype.numberValue = function() {
  return this.value - 0;
}

StringValue.prototype.nodeSetValue = function() {
  throw this;
}

function BooleanValue(value) {
  this.value = value;
  this.type = 'boolean';
}

BooleanValue.prototype.stringValue = function() {
  return '' + this.value;
}

BooleanValue.prototype.booleanValue = function() {
  return this.value;
}

BooleanValue.prototype.numberValue = function() {
  return this.value ? 1 : 0;
}

BooleanValue.prototype.nodeSetValue = function() {
  throw this;
}

function NumberValue(value) {
  this.value = value;
  this.type = 'number';
}

NumberValue.prototype.stringValue = function() {
  return '' + this.value;
}

NumberValue.prototype.booleanValue = function() {
  return !!this.value;
}

NumberValue.prototype.numberValue = function() {
  return this.value - 0;
}

NumberValue.prototype.nodeSetValue = function() {
  throw this;
}

function NodeSetValue(value) {
  this.value = value;
  this.type = 'node-set';
}

NodeSetValue.prototype.stringValue = function() {
  if (this.value.length == 0) {
    return '';
  } else {
    return xmlValue(this.value[0]);
  }
}

NodeSetValue.prototype.booleanValue = function() {
  return this.value.length > 0;
}

NodeSetValue.prototype.numberValue = function() {
  return this.stringValue() - 0;
}

NodeSetValue.prototype.nodeSetValue = function() {
  return this.value;
};

// XPath expressions. They are used as nodes in the parse tree and
// possess an evaluate() method to compute an XPath value given an XPath
// context. Expressions are returned from the parser. Teh set of
// expression classes closely mirrors the set of non terminal symbols
// in the grammar. Every non trivial nonterminal symbol has a
// corresponding expression class.
//
// The common expression interface consists of the following methods:
//
// evaluate(context) -- evaluates the expression, returns a value.
//
// toString() -- returns the XPath text representation of the
// expression (defined in xsltdebug.js).
//
// parseTree(indent) -- returns a parse tree representation of the
// expression (defined in xsltdebug.js).

function TokenExpr(m) {
  this.value = m;
}

TokenExpr.prototype.evaluate = function() {
  return new StringValue(this.value);
};

function LocationExpr() {
  this.absolute = false;
  this.steps = [];
}

LocationExpr.prototype.appendStep = function(s) {
  var combinedStep = this._combineSteps(this.steps[this.steps.length-1], s);
  if (combinedStep) {
    this.steps[this.steps.length-1] = combinedStep;
  } else {
    this.steps.push(s);
  }
}

LocationExpr.prototype.prependStep = function(s) {
  var combinedStep = this._combineSteps(s, this.steps[0]);
  if (combinedStep) {
    this.steps[0] = combinedStep;
  } else {
    this.steps.unshift(s);
  }
};

// DGF try to combine two steps into one step (perf enhancement)
LocationExpr.prototype._combineSteps = function(prevStep, nextStep) {
  if (!prevStep) return null;
  if (!nextStep) return null;
  var hasPredicates = (prevStep.predicates && prevStep.predicates.length > 0);
  if (prevStep.nodetest instanceof NodeTestAny && !hasPredicates) {
    // maybe suitable to be combined
    if (prevStep.axis == xpathAxis.DESCENDANT_OR_SELF) {
      if (nextStep.axis == xpathAxis.CHILD) {
        // HBC - commenting out, because this is not a valid reduction
        //nextStep.axis = xpathAxis.DESCENDANT;
        //return nextStep;
      } else if (nextStep.axis == xpathAxis.SELF) {
        nextStep.axis = xpathAxis.DESCENDANT_OR_SELF;
        return nextStep;
      }
    } else if (prevStep.axis == xpathAxis.DESCENDANT) {
      if (nextStep.axis == xpathAxis.SELF) {
        nextStep.axis = xpathAxis.DESCENDANT;
        return nextStep;
      }
    }
  }
  return null;
}

LocationExpr.prototype.evaluate = function(ctx) {
  var start;
  if (this.absolute) {
    start = ctx.root;

  } else {
    start = ctx.node;
  }

  var nodes = [];
  xPathStep(nodes, this.steps, 0, start, ctx);
  return new NodeSetValue(nodes);
};

function xPathStep(nodes, steps, step, input, ctx) {
  var s = steps[step];
  var ctx2 = ctx.clone(input);
  
  if (ctx.returnOnFirstMatch && !s.hasPositionalPredicate) {
    var nodelist = s.evaluate(ctx2).nodeSetValue();
    // the predicates were not processed in the last evaluate(), so that we can
    // process them here with the returnOnFirstMatch optimization. We do a
    // depth-first grab at any nodes that pass the predicate tests. There is no
    // way to optimize when predicates contain positional selectors, including
    // indexes or uses of the last() or position() functions, because they
    // typically require the entire nodelist for context. Process without
    // optimization if we encounter such selectors.
    var nLength = nodelist.length;
    var pLength = s.predicate.length;
    nodelistLoop:
    for (var i = 0; i < nLength; ++i) {
      var n = nodelist[i];
      for (var j = 0; j < pLength; ++j) {
        if (!s.predicate[j].evaluate(ctx.clone(n, i, nodelist)).booleanValue()) {
          continue nodelistLoop;
        }
      }
      // n survived the predicate tests!
      if (step == steps.length - 1) {
        nodes.push(n);
      }
      else {
        xPathStep(nodes, steps, step + 1, n, ctx);
      }
      if (nodes.length > 0) {
        break;
      }
    }
  }
  else {
    // set returnOnFirstMatch to false for the cloned ExprContext, because
    // behavior in StepExpr.prototype.evaluate is driven off its value. Note
    // that the original context may still have true for this value.
    ctx2.returnOnFirstMatch = false;
    var nodelist = s.evaluate(ctx2).nodeSetValue();
    for (var i = 0; i < nodelist.length; ++i) {
      if (step == steps.length - 1) {
        nodes.push(nodelist[i]);
      } else {
        xPathStep(nodes, steps, step + 1, nodelist[i], ctx);
      }
    }
  }
}

function StepExpr(axis, nodetest, opt_predicate) {
  this.axis = axis;
  this.nodetest = nodetest;
  this.predicate = opt_predicate || [];
  this.hasPositionalPredicate = false;
  for (var i = 0; i < this.predicate.length; ++i) {
    if (predicateExprHasPositionalSelector(this.predicate[i].expr)) {
      this.hasPositionalPredicate = true;
      break;
    }
  }
}

StepExpr.prototype.appendPredicate = function(p) {
  this.predicate.push(p);
  if (!this.hasPositionalPredicate) {
    this.hasPositionalPredicate = predicateExprHasPositionalSelector(p.expr);
  }
}

StepExpr.prototype.evaluate = function(ctx) {
  var input = ctx.node;
  var nodelist = [];
  var skipNodeTest = false;
  
  if (this.nodetest instanceof NodeTestAny) {
    skipNodeTest = true;
  }

  // NOTE(mesch): When this was a switch() statement, it didn't work
  // in Safari/2.0. Not sure why though; it resulted in the JavaScript
  // console output "undefined" (without any line number or so).

  if (this.axis ==  xpathAxis.ANCESTOR_OR_SELF) {
    nodelist.push(input);
    for (var n = input.parentNode; n; n = n.parentNode) {
      nodelist.push(n);
    }

  } else if (this.axis == xpathAxis.ANCESTOR) {
    for (var n = input.parentNode; n; n = n.parentNode) {
      nodelist.push(n);
    }

  } else if (this.axis == xpathAxis.ATTRIBUTE) {
    if (this.nodetest.name != undefined) {
      // single-attribute step
      if (input.attributes) {
        if (input.attributes instanceof Array) {
          // probably evaluating on document created by xmlParse()
          copyArray(nodelist, input.attributes);
        }
        else {
          if (this.nodetest.name == 'style') {
            var value = input.getAttribute('style');
            if (value && typeof(value) != 'string') {
              // this is the case where indexing into the attributes array
              // doesn't give us the attribute node in IE - we create our own
              // node instead
              nodelist.push(XNode.create(DOM_ATTRIBUTE_NODE, 'style',
                value.cssText, document));
            }
            else {
              nodelist.push(input.attributes[this.nodetest.name]);
            }
          }
          else {
            nodelist.push(input.attributes[this.nodetest.name]);
          }
        }
      }
    }
    else {
      // all-attributes step
      if (ctx.ignoreAttributesWithoutValue) {
        copyArrayIgnoringAttributesWithoutValue(nodelist, input.attributes);
      }
      else {
        copyArray(nodelist, input.attributes);
      }
    }
    
  } else if (this.axis == xpathAxis.CHILD) {
    copyArray(nodelist, input.childNodes);

  } else if (this.axis == xpathAxis.DESCENDANT_OR_SELF) {
    if (this.nodetest.evaluate(ctx).booleanValue()) {
      nodelist.push(input);
    }
    var tagName = xpathExtractTagNameFromNodeTest(this.nodetest, ctx.ignoreNonElementNodesForNTA);
    xpathCollectDescendants(nodelist, input, tagName);
    if (tagName) skipNodeTest = true;

  } else if (this.axis == xpathAxis.DESCENDANT) {
    var tagName = xpathExtractTagNameFromNodeTest(this.nodetest, ctx.ignoreNonElementNodesForNTA);
    xpathCollectDescendants(nodelist, input, tagName);
    if (tagName) skipNodeTest = true;

  } else if (this.axis == xpathAxis.FOLLOWING) {
    for (var n = input; n; n = n.parentNode) {
      for (var nn = n.nextSibling; nn; nn = nn.nextSibling) {
        nodelist.push(nn);
        xpathCollectDescendants(nodelist, nn);
      }
    }

  } else if (this.axis == xpathAxis.FOLLOWING_SIBLING) {
    for (var n = input.nextSibling; n; n = n.nextSibling) {
      nodelist.push(n);
    }

  } else if (this.axis == xpathAxis.NAMESPACE) {
    alert('not implemented: axis namespace');

  } else if (this.axis == xpathAxis.PARENT) {
    if (input.parentNode) {
      nodelist.push(input.parentNode);
    }

  } else if (this.axis == xpathAxis.PRECEDING) {
    for (var n = input; n; n = n.parentNode) {
      for (var nn = n.previousSibling; nn; nn = nn.previousSibling) {
        nodelist.push(nn);
        xpathCollectDescendantsReverse(nodelist, nn);
      }
    }

  } else if (this.axis == xpathAxis.PRECEDING_SIBLING) {
    for (var n = input.previousSibling; n; n = n.previousSibling) {
      nodelist.push(n);
    }

  } else if (this.axis == xpathAxis.SELF) {
    nodelist.push(input);

  } else {
    throw 'ERROR -- NO SUCH AXIS: ' + this.axis;
  }

  if (!skipNodeTest) {
    // process node test
    var nodelist0 = nodelist;
    nodelist = [];
    for (var i = 0; i < nodelist0.length; ++i) {
      var n = nodelist0[i];
      if (this.nodetest.evaluate(ctx.clone(n, i, nodelist0)).booleanValue()) {
        nodelist.push(n);
      }
    }
  }

  // process predicates
  if (!ctx.returnOnFirstMatch) {
    for (var i = 0; i < this.predicate.length; ++i) {
      var nodelist0 = nodelist;
      nodelist = [];
      for (var ii = 0; ii < nodelist0.length; ++ii) {
        var n = nodelist0[ii];
        if (this.predicate[i].evaluate(ctx.clone(n, ii, nodelist0)).booleanValue()) {
          nodelist.push(n);
        }
      }
    }
  }

  return new NodeSetValue(nodelist);
};

function NodeTestAny() {
  this.value = new BooleanValue(true);
}

NodeTestAny.prototype.evaluate = function(ctx) {
  return this.value;
};

function NodeTestElementOrAttribute() {}

NodeTestElementOrAttribute.prototype.evaluate = function(ctx) {
  return new BooleanValue(
      ctx.node.nodeType == DOM_ELEMENT_NODE ||
      ctx.node.nodeType == DOM_ATTRIBUTE_NODE);
}

function NodeTestText() {}

NodeTestText.prototype.evaluate = function(ctx) {
  return new BooleanValue(ctx.node.nodeType == DOM_TEXT_NODE);
}

function NodeTestComment() {}

NodeTestComment.prototype.evaluate = function(ctx) {
  return new BooleanValue(ctx.node.nodeType == DOM_COMMENT_NODE);
}

function NodeTestPI(target) {
  this.target = target;
}

NodeTestPI.prototype.evaluate = function(ctx) {
  return new
  BooleanValue(ctx.node.nodeType == DOM_PROCESSING_INSTRUCTION_NODE &&
               (!this.target || ctx.node.nodeName == this.target));
}

function NodeTestNC(nsprefix) {
  this.regex = new RegExp("^" + nsprefix + ":");
  this.nsprefix = nsprefix;
}

NodeTestNC.prototype.evaluate = function(ctx) {
  var n = ctx.node;
  return new BooleanValue(this.regex.match(n.nodeName));
}

function NodeTestName(name) {
  this.name = name;
  this.re = new RegExp('^' + name + '$', "i");
}

NodeTestName.prototype.evaluate = function(ctx) {
  var n = ctx.node;
  if (ctx.caseInsensitive) {
    if (n.nodeName.length != this.name.length) return new BooleanValue(false);
    return new BooleanValue(this.re.test(n.nodeName));
  } else {
    return new BooleanValue(n.nodeName == this.name);
  }
}

function PredicateExpr(expr) {
  this.expr = expr;
}

PredicateExpr.prototype.evaluate = function(ctx) {
  var v = this.expr.evaluate(ctx);
  if (v.type == 'number') {
    // NOTE(mesch): Internally, position is represented starting with
    // 0, however in XPath position starts with 1. See functions
    // position() and last().
    return new BooleanValue(ctx.position == v.numberValue() - 1);
  } else {
    return new BooleanValue(v.booleanValue());
  }
};

function FunctionCallExpr(name) {
  this.name = name;
  this.args = [];
}

FunctionCallExpr.prototype.appendArg = function(arg) {
  this.args.push(arg);
};

FunctionCallExpr.prototype.evaluate = function(ctx) {
  var fn = '' + this.name.value;
  var f = this.xpathfunctions[fn];
  if (f) {
    return f.call(this, ctx);
  } else {
    xpathLog('XPath NO SUCH FUNCTION ' + fn);
    return new BooleanValue(false);
  }
};

FunctionCallExpr.prototype.xpathfunctions = {
  'last': function(ctx) {
    assert(this.args.length == 0);
    // NOTE(mesch): XPath position starts at 1.
    return new NumberValue(ctx.contextSize());
  },

  'position': function(ctx) {
    assert(this.args.length == 0);
    // NOTE(mesch): XPath position starts at 1.
    return new NumberValue(ctx.position + 1);
  },

  'count': function(ctx) {
    assert(this.args.length == 1);
    var v = this.args[0].evaluate(ctx);
    return new NumberValue(v.nodeSetValue().length);
  },

  'id': function(ctx) {
    assert(this.args.length == 1);
    var e = this.args[0].evaluate(ctx);
    var ret = [];
    var ids;
    if (e.type == 'node-set') {
      ids = [];
      var en = e.nodeSetValue();
      for (var i = 0; i < en.length; ++i) {
        var v = xmlValue(en[i]).split(/\s+/);
        for (var ii = 0; ii < v.length; ++ii) {
          ids.push(v[ii]);
        }
      }
    } else {
      ids = e.stringValue().split(/\s+/);
    }
    var d = ctx.root;
    for (var i = 0; i < ids.length; ++i) {
      var n = d.getElementById(ids[i]);
      if (n) {
        ret.push(n);
      }
    }
    return new NodeSetValue(ret);
  },

  'local-name': function(ctx) {
    alert('not implmented yet: XPath function local-name()');
  },

  'namespace-uri': function(ctx) {
    alert('not implmented yet: XPath function namespace-uri()');
  },

  'name': function(ctx) {
    assert(this.args.length == 1 || this.args.length == 0);
    var n;
    if (this.args.length == 0) {
      n = [ ctx.node ];
    } else {
      n = this.args[0].evaluate(ctx).nodeSetValue();
    }

    if (n.length == 0) {
      return new StringValue('');
    } else {
      return new StringValue(n[0].nodeName);
    }
  },

  'string':  function(ctx) {
    assert(this.args.length == 1 || this.args.length == 0);
    if (this.args.length == 0) {
      return new StringValue(new NodeSetValue([ ctx.node ]).stringValue());
    } else {
      return new StringValue(this.args[0].evaluate(ctx).stringValue());
    }
  },

  'concat': function(ctx) {
    var ret = '';
    for (var i = 0; i < this.args.length; ++i) {
      ret += this.args[i].evaluate(ctx).stringValue();
    }
    return new StringValue(ret);
  },

  'starts-with': function(ctx) {
    assert(this.args.length == 2);
    var s0 = this.args[0].evaluate(ctx).stringValue();
    var s1 = this.args[1].evaluate(ctx).stringValue();
    return new BooleanValue(s0.indexOf(s1) == 0);
  },
  
  'ends-with': function(ctx) {
    assert(this.args.length == 2);
    var s0 = this.args[0].evaluate(ctx).stringValue();
    var s1 = this.args[1].evaluate(ctx).stringValue();
    var re = new RegExp(RegExp.escape(s1) + '$');
    return new BooleanValue(re.test(s0));
  },

  'contains': function(ctx) {
    assert(this.args.length == 2);
    var s0 = this.args[0].evaluate(ctx).stringValue();
    var s1 = this.args[1].evaluate(ctx).stringValue();
    return new BooleanValue(s0.indexOf(s1) != -1);
  },

  'substring-before': function(ctx) {
    assert(this.args.length == 2);
    var s0 = this.args[0].evaluate(ctx).stringValue();
    var s1 = this.args[1].evaluate(ctx).stringValue();
    var i = s0.indexOf(s1);
    var ret;
    if (i == -1) {
      ret = '';
    } else {
      ret = s0.substr(0,i);
    }
    return new StringValue(ret);
  },

  'substring-after': function(ctx) {
    assert(this.args.length == 2);
    var s0 = this.args[0].evaluate(ctx).stringValue();
    var s1 = this.args[1].evaluate(ctx).stringValue();
    var i = s0.indexOf(s1);
    var ret;
    if (i == -1) {
      ret = '';
    } else {
      ret = s0.substr(i + s1.length);
    }
    return new StringValue(ret);
  },

  'substring': function(ctx) {
    // NOTE: XPath defines the position of the first character in a
    // string to be 1, in JavaScript this is 0 ([XPATH] Section 4.2).
    assert(this.args.length == 2 || this.args.length == 3);
    var s0 = this.args[0].evaluate(ctx).stringValue();
    var s1 = this.args[1].evaluate(ctx).numberValue();
    var ret;
    if (this.args.length == 2) {
      var i1 = Math.max(0, Math.round(s1) - 1);
      ret = s0.substr(i1);

    } else {
      var s2 = this.args[2].evaluate(ctx).numberValue();
      var i0 = Math.round(s1) - 1;
      var i1 = Math.max(0, i0);
      var i2 = Math.round(s2) - Math.max(0, -i0);
      ret = s0.substr(i1, i2);
    }
    return new StringValue(ret);
  },

  'string-length': function(ctx) {
    var s;
    if (this.args.length > 0) {
      s = this.args[0].evaluate(ctx).stringValue();
    } else {
      s = new NodeSetValue([ ctx.node ]).stringValue();
    }
    return new NumberValue(s.length);
  },

  'normalize-space': function(ctx) {
    var s;
    if (this.args.length > 0) {
      s = this.args[0].evaluate(ctx).stringValue();
    } else {
      s = new NodeSetValue([ ctx.node ]).stringValue();
    }
    s = s.replace(/^\s*/,'').replace(/\s*$/,'').replace(/\s+/g, ' ');
    return new StringValue(s);
  },

  'translate': function(ctx) {
    assert(this.args.length == 3);
    var s0 = this.args[0].evaluate(ctx).stringValue();
    var s1 = this.args[1].evaluate(ctx).stringValue();
    var s2 = this.args[2].evaluate(ctx).stringValue();

    for (var i = 0; i < s1.length; ++i) {
      s0 = s0.replace(new RegExp(s1.charAt(i), 'g'), s2.charAt(i));
    }
    return new StringValue(s0);
  },
  
  'matches': function(ctx) {
    assert(this.args.length >= 2);
    var s0 = this.args[0].evaluate(ctx).stringValue();
    var s1 = this.args[1].evaluate(ctx).stringValue();
    if (this.args.length > 2) {
      var s2 = this.args[2].evaluate(ctx).stringValue();
      if (/[^mi]/.test(s2)) {
        throw 'Invalid regular expression syntax: ' + s2;
      }
    }
    
    try {
      var re = new RegExp(s1, s2);
    }
    catch (e) {
      throw 'Invalid matches argument: ' + s1;
    }
    return new BooleanValue(re.test(s0));
  },

  'boolean': function(ctx) {
    assert(this.args.length == 1);
    return new BooleanValue(this.args[0].evaluate(ctx).booleanValue());
  },

  'not': function(ctx) {
    assert(this.args.length == 1);
    var ret = !this.args[0].evaluate(ctx).booleanValue();
    return new BooleanValue(ret);
  },

  'true': function(ctx) {
    assert(this.args.length == 0);
    return new BooleanValue(true);
  },

  'false': function(ctx) {
    assert(this.args.length == 0);
    return new BooleanValue(false);
  },

  'lang': function(ctx) {
    assert(this.args.length == 1);
    var lang = this.args[0].evaluate(ctx).stringValue();
    var xmllang;
    var n = ctx.node;
    while (n && n != n.parentNode /* just in case ... */) {
      xmllang = n.getAttribute('xml:lang');
      if (xmllang) {
        break;
      }
      n = n.parentNode;
    }
    if (!xmllang) {
      return new BooleanValue(false);
    } else {
      var re = new RegExp('^' + lang + '$', 'i');
      return new BooleanValue(xmllang.match(re) ||
                              xmllang.replace(/_.*$/,'').match(re));
    }
  },

  'number': function(ctx) {
    assert(this.args.length == 1 || this.args.length == 0);

    if (this.args.length == 1) {
      return new NumberValue(this.args[0].evaluate(ctx).numberValue());
    } else {
      return new NumberValue(new NodeSetValue([ ctx.node ]).numberValue());
    }
  },

  'sum': function(ctx) {
    assert(this.args.length == 1);
    var n = this.args[0].evaluate(ctx).nodeSetValue();
    var sum = 0;
    for (var i = 0; i < n.length; ++i) {
      sum += xmlValue(n[i]) - 0;
    }
    return new NumberValue(sum);
  },

  'floor': function(ctx) {
    assert(this.args.length == 1);
    var num = this.args[0].evaluate(ctx).numberValue();
    return new NumberValue(Math.floor(num));
  },

  'ceiling': function(ctx) {
    assert(this.args.length == 1);
    var num = this.args[0].evaluate(ctx).numberValue();
    return new NumberValue(Math.ceil(num));
  },

  'round': function(ctx) {
    assert(this.args.length == 1);
    var num = this.args[0].evaluate(ctx).numberValue();
    return new NumberValue(Math.round(num));
  },

  // TODO(mesch): The following functions are custom. There is a
  // standard that defines how to add functions, which should be
  // applied here.

  'ext-join': function(ctx) {
    assert(this.args.length == 2);
    var nodes = this.args[0].evaluate(ctx).nodeSetValue();
    var delim = this.args[1].evaluate(ctx).stringValue();
    var ret = '';
    for (var i = 0; i < nodes.length; ++i) {
      if (ret) {
        ret += delim;
      }
      ret += xmlValue(nodes[i]);
    }
    return new StringValue(ret);
  },

  // ext-if() evaluates and returns its second argument, if the
  // boolean value of its first argument is true, otherwise it
  // evaluates and returns its third argument.

  'ext-if': function(ctx) {
    assert(this.args.length == 3);
    if (this.args[0].evaluate(ctx).booleanValue()) {
      return this.args[1].evaluate(ctx);
    } else {
      return this.args[2].evaluate(ctx);
    }
  },

  // ext-cardinal() evaluates its single argument as a number, and
  // returns the current node that many times. It can be used in the
  // select attribute to iterate over an integer range.

  'ext-cardinal': function(ctx) {
    assert(this.args.length >= 1);
    var c = this.args[0].evaluate(ctx).numberValue();
    var ret = [];
    for (var i = 0; i < c; ++i) {
      ret.push(ctx.node);
    }
    return new NodeSetValue(ret);
  }
};

function UnionExpr(expr1, expr2) {
  this.expr1 = expr1;
  this.expr2 = expr2;
}

UnionExpr.prototype.evaluate = function(ctx) {
  var nodes1 = this.expr1.evaluate(ctx).nodeSetValue();
  var nodes2 = this.expr2.evaluate(ctx).nodeSetValue();
  var I1 = nodes1.length;
  for (var i2 = 0; i2 < nodes2.length; ++i2) {
    var n = nodes2[i2];
    var inBoth = false;
    for (var i1 = 0; i1 < I1; ++i1) {
      if (nodes1[i1] == n) {
        inBoth = true;
        i1 = I1; // break inner loop
      }
    }
    if (!inBoth) {
      nodes1.push(n);
    }
  }
  return new NodeSetValue(nodes1);
};

function PathExpr(filter, rel) {
  this.filter = filter;
  this.rel = rel;
}

PathExpr.prototype.evaluate = function(ctx) {
  // the filter expression should be evaluated in its entirety with no
  // optimization, as we can't backtrack to it after having moved on to
  // evaluating the relative location path
  var flag = ctx.returnOnFirstMatch;
  ctx.setReturnOnFirstMatch(false);
  var nodes = this.filter.evaluate(ctx).nodeSetValue();
  ctx.setReturnOnFirstMatch(flag);
  
  var nodes1 = [];
  if (ctx.returnOnFirstMatch) {
    for (var i = 0; i < nodes.length; ++i) {
      nodes1 = this.rel.evaluate(ctx.clone(nodes[i], i, nodes)).nodeSetValue();
      if (nodes1.length > 0) {
        break;
      }
    }
    return new NodeSetValue(nodes1);
  }
  else {
    for (var i = 0; i < nodes.length; ++i) {
      var nodes0 = this.rel.evaluate(ctx.clone(nodes[i], i, nodes)).nodeSetValue();
      for (var ii = 0; ii < nodes0.length; ++ii) {
        nodes1.push(nodes0[ii]);
      }
    }
    return new NodeSetValue(nodes1);
  }
};

function FilterExpr(expr, predicate) {
  this.expr = expr;
  this.predicate = predicate;
}

FilterExpr.prototype.evaluate = function(ctx) {
  var flag = ctx.returnOnFirstMatch;
  ctx.setReturnOnFirstMatch(false);
  var nodes = this.expr.evaluate(ctx).nodeSetValue();
  ctx.setReturnOnFirstMatch(flag);
  
  for (var i = 0; i < this.predicate.length; ++i) {
    var nodes0 = nodes;
    nodes = [];
    for (var j = 0; j < nodes0.length; ++j) {
      var n = nodes0[j];
      if (this.predicate[i].evaluate(ctx.clone(n, j, nodes0)).booleanValue()) {
        nodes.push(n);
      }
    }
  }

  return new NodeSetValue(nodes);
}

function UnaryMinusExpr(expr) {
  this.expr = expr;
}

UnaryMinusExpr.prototype.evaluate = function(ctx) {
  return new NumberValue(-this.expr.evaluate(ctx).numberValue());
};

function BinaryExpr(expr1, op, expr2) {
  this.expr1 = expr1;
  this.expr2 = expr2;
  this.op = op;
}

BinaryExpr.prototype.evaluate = function(ctx) {
  var ret;
  switch (this.op.value) {
    case 'or':
      ret = new BooleanValue(this.expr1.evaluate(ctx).booleanValue() ||
                             this.expr2.evaluate(ctx).booleanValue());
      break;

    case 'and':
      ret = new BooleanValue(this.expr1.evaluate(ctx).booleanValue() &&
                             this.expr2.evaluate(ctx).booleanValue());
      break;

    case '+':
      ret = new NumberValue(this.expr1.evaluate(ctx).numberValue() +
                            this.expr2.evaluate(ctx).numberValue());
      break;

    case '-':
      ret = new NumberValue(this.expr1.evaluate(ctx).numberValue() -
                            this.expr2.evaluate(ctx).numberValue());
      break;

    case '*':
      ret = new NumberValue(this.expr1.evaluate(ctx).numberValue() *
                            this.expr2.evaluate(ctx).numberValue());
      break;

    case 'mod':
      ret = new NumberValue(this.expr1.evaluate(ctx).numberValue() %
                            this.expr2.evaluate(ctx).numberValue());
      break;

    case 'div':
      ret = new NumberValue(this.expr1.evaluate(ctx).numberValue() /
                            this.expr2.evaluate(ctx).numberValue());
      break;

    case '=':
      ret = this.compare(ctx, function(x1, x2) { return x1 == x2; });
      break;

    case '!=':
      ret = this.compare(ctx, function(x1, x2) { return x1 != x2; });
      break;

    case '<':
      ret = this.compare(ctx, function(x1, x2) { return x1 < x2; });
      break;

    case '<=':
      ret = this.compare(ctx, function(x1, x2) { return x1 <= x2; });
      break;

    case '>':
      ret = this.compare(ctx, function(x1, x2) { return x1 > x2; });
      break;

    case '>=':
      ret = this.compare(ctx, function(x1, x2) { return x1 >= x2; });
      break;

    default:
      alert('BinaryExpr.evaluate: ' + this.op.value);
  }
  return ret;
};

BinaryExpr.prototype.compare = function(ctx, cmp) {
  var v1 = this.expr1.evaluate(ctx);
  var v2 = this.expr2.evaluate(ctx);

  var ret;
  if (v1.type == 'node-set' && v2.type == 'node-set') {
    var n1 = v1.nodeSetValue();
    var n2 = v2.nodeSetValue();
    ret = false;
    for (var i1 = 0; i1 < n1.length; ++i1) {
      for (var i2 = 0; i2 < n2.length; ++i2) {
        if (cmp(xmlValue(n1[i1]), xmlValue(n2[i2]))) {
          ret = true;
          // Break outer loop. Labels confuse the jscompiler and we
          // don't use them.
          i2 = n2.length;
          i1 = n1.length;
        }
      }
    }

  } else if (v1.type == 'node-set' || v2.type == 'node-set') {

    if (v1.type == 'number') {
      var s = v1.numberValue();
      var n = v2.nodeSetValue();

      ret = false;
      for (var i = 0;  i < n.length; ++i) {
        var nn = xmlValue(n[i]) - 0;
        if (cmp(s, nn)) {
          ret = true;
          break;
        }
      }

    } else if (v2.type == 'number') {
      var n = v1.nodeSetValue();
      var s = v2.numberValue();

      ret = false;
      for (var i = 0;  i < n.length; ++i) {
        var nn = xmlValue(n[i]) - 0;
        if (cmp(nn, s)) {
          ret = true;
          break;
        }
      }

    } else if (v1.type == 'string') {
      var s = v1.stringValue();
      var n = v2.nodeSetValue();

      ret = false;
      for (var i = 0;  i < n.length; ++i) {
        var nn = xmlValue(n[i]);
        if (cmp(s, nn)) {
          ret = true;
          break;
        }
      }

    } else if (v2.type == 'string') {
      var n = v1.nodeSetValue();
      var s = v2.stringValue();

      ret = false;
      for (var i = 0;  i < n.length; ++i) {
        var nn = xmlValue(n[i]);
        if (cmp(nn, s)) {
          ret = true;
          break;
        }
      }

    } else {
      ret = cmp(v1.booleanValue(), v2.booleanValue());
    }

  } else if (v1.type == 'boolean' || v2.type == 'boolean') {
    ret = cmp(v1.booleanValue(), v2.booleanValue());

  } else if (v1.type == 'number' || v2.type == 'number') {
    ret = cmp(v1.numberValue(), v2.numberValue());

  } else {
    ret = cmp(v1.stringValue(), v2.stringValue());
  }

  return new BooleanValue(ret);
}

function LiteralExpr(value) {
  this.value = value;
}

LiteralExpr.prototype.evaluate = function(ctx) {
  return new StringValue(this.value);
};

function NumberExpr(value) {
  this.value = value;
}

NumberExpr.prototype.evaluate = function(ctx) {
  return new NumberValue(this.value);
};

function VariableExpr(name) {
  this.name = name;
}

VariableExpr.prototype.evaluate = function(ctx) {
  return ctx.getVariable(this.name);
}

// Factory functions for semantic values (i.e. Expressions) of the
// productions in the grammar. When a production is matched to reduce
// the current parse state stack, the function is called with the
// semantic values of the matched elements as arguments, and returns
// another semantic value. The semantic value is a node of the parse
// tree, an expression object with an evaluate() method that evaluates the
// expression in an actual context. These factory functions are used
// in the specification of the grammar rules, below.

function makeTokenExpr(m) {
  return new TokenExpr(m);
}

function passExpr(e) {
  return e;
}

function makeLocationExpr1(slash, rel) {
  rel.absolute = true;
  return rel;
}

function makeLocationExpr2(dslash, rel) {
  rel.absolute = true;
  rel.prependStep(makeAbbrevStep(dslash.value));
  return rel;
}

function makeLocationExpr3(slash) {
  var ret = new LocationExpr();
  ret.appendStep(makeAbbrevStep('.'));
  ret.absolute = true;
  return ret;
}

function makeLocationExpr4(dslash) {
  var ret = new LocationExpr();
  ret.absolute = true;
  ret.appendStep(makeAbbrevStep(dslash.value));
  return ret;
}

function makeLocationExpr5(step) {
  var ret = new LocationExpr();
  ret.appendStep(step);
  return ret;
}

function makeLocationExpr6(rel, slash, step) {
  rel.appendStep(step);
  return rel;
}

function makeLocationExpr7(rel, dslash, step) {
  rel.appendStep(makeAbbrevStep(dslash.value));
  rel.appendStep(step);
  return rel;
}

function makeStepExpr1(dot) {
  return makeAbbrevStep(dot.value);
}

function makeStepExpr2(ddot) {
  return makeAbbrevStep(ddot.value);
}

function makeStepExpr3(axisname, axis, nodetest) {
  return new StepExpr(axisname.value, nodetest);
}

function makeStepExpr4(at, nodetest) {
  return new StepExpr('attribute', nodetest);
}

function makeStepExpr5(nodetest) {
  return new StepExpr('child', nodetest);
}

function makeStepExpr6(step, predicate) {
  step.appendPredicate(predicate);
  return step;
}

function makeAbbrevStep(abbrev) {
  switch (abbrev) {
  case '//':
    return new StepExpr('descendant-or-self', new NodeTestAny);

  case '.':
    return new StepExpr('self', new NodeTestAny);

  case '..':
    return new StepExpr('parent', new NodeTestAny);
  }
}

function makeNodeTestExpr1(asterisk) {
  return new NodeTestElementOrAttribute;
}

function makeNodeTestExpr2(ncname, colon, asterisk) {
  return new NodeTestNC(ncname.value);
}

function makeNodeTestExpr3(qname) {
  return new NodeTestName(qname.value);
}

function makeNodeTestExpr4(typeo, parenc) {
  var type = typeo.value.replace(/\s*\($/, '');
  switch(type) {
  case 'node':
    return new NodeTestAny;

  case 'text':
    return new NodeTestText;

  case 'comment':
    return new NodeTestComment;

  case 'processing-instruction':
    return new NodeTestPI('');
  }
}

function makeNodeTestExpr5(typeo, target, parenc) {
  var type = typeo.replace(/\s*\($/, '');
  if (type != 'processing-instruction') {
    throw type;
  }
  return new NodeTestPI(target.value);
}

function makePredicateExpr(pareno, expr, parenc) {
  return new PredicateExpr(expr);
}

function makePrimaryExpr(pareno, expr, parenc) {
  return expr;
}

function makeFunctionCallExpr1(name, pareno, parenc) {
  return new FunctionCallExpr(name);
}

function makeFunctionCallExpr2(name, pareno, arg1, args, parenc) {
  var ret = new FunctionCallExpr(name);
  ret.appendArg(arg1);
  for (var i = 0; i < args.length; ++i) {
    ret.appendArg(args[i]);
  }
  return ret;
}

function makeArgumentExpr(comma, expr) {
  return expr;
}

function makeUnionExpr(expr1, pipe, expr2) {
  return new UnionExpr(expr1, expr2);
}

function makePathExpr1(filter, slash, rel) {
  return new PathExpr(filter, rel);
}

function makePathExpr2(filter, dslash, rel) {
  rel.prependStep(makeAbbrevStep(dslash.value));
  return new PathExpr(filter, rel);
}

function makeFilterExpr(expr, predicates) {
  if (predicates.length > 0) {
    return new FilterExpr(expr, predicates);
  } else {
    return expr;
  }
}

function makeUnaryMinusExpr(minus, expr) {
  return new UnaryMinusExpr(expr);
}

function makeBinaryExpr(expr1, op, expr2) {
  return new BinaryExpr(expr1, op, expr2);
}

function makeLiteralExpr(token) {
  // remove quotes from the parsed value:
  var value = token.value.substring(1, token.value.length - 1);
  return new LiteralExpr(value);
}

function makeNumberExpr(token) {
  return new NumberExpr(token.value);
}

function makeVariableReference(dollar, name) {
  return new VariableExpr(name.value);
}

// Used before parsing for optimization of common simple cases. See
// the begin of xpathParse() for which they are.
function makeSimpleExpr(expr) {
  if (expr.charAt(0) == '$') {
    return new VariableExpr(expr.substr(1));
  } else if (expr.charAt(0) == '@') {
    var a = new NodeTestName(expr.substr(1));
    var b = new StepExpr('attribute', a);
    var c = new LocationExpr();
    c.appendStep(b);
    return c;
  } else if (expr.match(/^[0-9]+$/)) {
    return new NumberExpr(expr);
  } else {
    var a = new NodeTestName(expr);
    var b = new StepExpr('child', a);
    var c = new LocationExpr();
    c.appendStep(b);
    return c;
  }
}

function makeSimpleExpr2(expr) {
  var steps = stringSplit(expr, '/');
  var c = new LocationExpr();
  for (var i = 0; i < steps.length; ++i) {
    var a = new NodeTestName(steps[i]);
    var b = new StepExpr('child', a);
    c.appendStep(b);
  }
  return c;
}

// The axes of XPath expressions.

var xpathAxis = {
  ANCESTOR_OR_SELF: 'ancestor-or-self',
  ANCESTOR: 'ancestor',
  ATTRIBUTE: 'attribute',
  CHILD: 'child',
  DESCENDANT_OR_SELF: 'descendant-or-self',
  DESCENDANT: 'descendant',
  FOLLOWING_SIBLING: 'following-sibling',
  FOLLOWING: 'following',
  NAMESPACE: 'namespace',
  PARENT: 'parent',
  PRECEDING_SIBLING: 'preceding-sibling',
  PRECEDING: 'preceding',
  SELF: 'self'
};

var xpathAxesRe = [
    xpathAxis.ANCESTOR_OR_SELF,
    xpathAxis.ANCESTOR,
    xpathAxis.ATTRIBUTE,
    xpathAxis.CHILD,
    xpathAxis.DESCENDANT_OR_SELF,
    xpathAxis.DESCENDANT,
    xpathAxis.FOLLOWING_SIBLING,
    xpathAxis.FOLLOWING,
    xpathAxis.NAMESPACE,
    xpathAxis.PARENT,
    xpathAxis.PRECEDING_SIBLING,
    xpathAxis.PRECEDING,
    xpathAxis.SELF
].join('|');


// The tokens of the language. The label property is just used for
// generating debug output. The prec property is the precedence used
// for shift/reduce resolution. Default precedence is 0 as a lookahead
// token and 2 on the stack. TODO(mesch): this is certainly not
// necessary and too complicated. Simplify this!

// NOTE: tabular formatting is the big exception, but here it should
// be OK.

var TOK_PIPE =   { label: "|",   prec:   17, re: new RegExp("^\\|") };
var TOK_DSLASH = { label: "//",  prec:   19, re: new RegExp("^//")  };
var TOK_SLASH =  { label: "/",   prec:   30, re: new RegExp("^/")   };
var TOK_AXIS =   { label: "::",  prec:   20, re: new RegExp("^::")  };
var TOK_COLON =  { label: ":",   prec: 1000, re: new RegExp("^:")  };
var TOK_AXISNAME = { label: "[axis]", re: new RegExp('^(' + xpathAxesRe + ')') };
var TOK_PARENO = { label: "(",   prec:   34, re: new RegExp("^\\(") };
var TOK_PARENC = { label: ")",               re: new RegExp("^\\)") };
var TOK_DDOT =   { label: "..",  prec:   34, re: new RegExp("^\\.\\.") };
var TOK_DOT =    { label: ".",   prec:   34, re: new RegExp("^\\.") };
var TOK_AT =     { label: "@",   prec:   34, re: new RegExp("^@")   };

var TOK_COMMA =  { label: ",",               re: new RegExp("^,") };

var TOK_OR =     { label: "or",  prec:   10, re: new RegExp("^or\\b") };
var TOK_AND =    { label: "and", prec:   11, re: new RegExp("^and\\b") };
var TOK_EQ =     { label: "=",   prec:   12, re: new RegExp("^=")   };
var TOK_NEQ =    { label: "!=",  prec:   12, re: new RegExp("^!=")  };
var TOK_GE =     { label: ">=",  prec:   13, re: new RegExp("^>=")  };
var TOK_GT =     { label: ">",   prec:   13, re: new RegExp("^>")   };
var TOK_LE =     { label: "<=",  prec:   13, re: new RegExp("^<=")  };
var TOK_LT =     { label: "<",   prec:   13, re: new RegExp("^<")   };
var TOK_PLUS =   { label: "+",   prec:   14, re: new RegExp("^\\+"), left: true };
var TOK_MINUS =  { label: "-",   prec:   14, re: new RegExp("^\\-"), left: true };
var TOK_DIV =    { label: "div", prec:   15, re: new RegExp("^div\\b"), left: true };
var TOK_MOD =    { label: "mod", prec:   15, re: new RegExp("^mod\\b"), left: true };

var TOK_BRACKO = { label: "[",   prec:   32, re: new RegExp("^\\[") };
var TOK_BRACKC = { label: "]",               re: new RegExp("^\\]") };
var TOK_DOLLAR = { label: "$",               re: new RegExp("^\\$") };

var TOK_NCNAME = { label: "[ncname]", re: new RegExp('^' + XML_NC_NAME) };

var TOK_ASTERISK = { label: "*", prec: 15, re: new RegExp("^\\*"), left: true };
var TOK_LITERALQ = { label: "[litq]", prec: 20, re: new RegExp("^'[^\\']*'") };
var TOK_LITERALQQ = {
  label: "[litqq]",
  prec: 20,
  re: new RegExp('^"[^\\"]*"')
};

var TOK_NUMBER  = {
  label: "[number]",
  prec: 35,
  re: new RegExp('^\\d+(\\.\\d*)?') };

var TOK_QNAME = {
  label: "[qname]",
  re: new RegExp('^(' + XML_NC_NAME + ':)?' + XML_NC_NAME)
};

var TOK_NODEO = {
  label: "[nodetest-start]",
  re: new RegExp('^(processing-instruction|comment|text|node)\\(')
};

// The table of the tokens of our grammar, used by the lexer: first
// column the tag, second column a regexp to recognize it in the
// input, third column the precedence of the token, fourth column a
// factory function for the semantic value of the token.
//
// NOTE: order of this list is important, because the first match
// counts. Cf. DDOT and DOT, and AXIS and COLON.

var xpathTokenRules = [
    TOK_DSLASH,
    TOK_SLASH,
    TOK_DDOT,
    TOK_DOT,
    TOK_AXIS,
    TOK_COLON,
    TOK_AXISNAME,
    TOK_NODEO,
    TOK_PARENO,
    TOK_PARENC,
    TOK_BRACKO,
    TOK_BRACKC,
    TOK_AT,
    TOK_COMMA,
    TOK_OR,
    TOK_AND,
    TOK_NEQ,
    TOK_EQ,
    TOK_GE,
    TOK_GT,
    TOK_LE,
    TOK_LT,
    TOK_PLUS,
    TOK_MINUS,
    TOK_ASTERISK,
    TOK_PIPE,
    TOK_MOD,
    TOK_DIV,
    TOK_LITERALQ,
    TOK_LITERALQQ,
    TOK_NUMBER,
    TOK_QNAME,
    TOK_NCNAME,
    TOK_DOLLAR
];

// All the nonterminals of the grammar. The nonterminal objects are
// identified by object identity; the labels are used in the debug
// output only.
var XPathLocationPath = { label: "LocationPath" };
var XPathRelativeLocationPath = { label: "RelativeLocationPath" };
var XPathAbsoluteLocationPath = { label: "AbsoluteLocationPath" };
var XPathStep = { label: "Step" };
var XPathNodeTest = { label: "NodeTest" };
var XPathPredicate = { label: "Predicate" };
var XPathLiteral = { label: "Literal" };
var XPathExpr = { label: "Expr" };
var XPathPrimaryExpr = { label: "PrimaryExpr" };
var XPathVariableReference = { label: "Variablereference" };
var XPathNumber = { label: "Number" };
var XPathFunctionCall = { label: "FunctionCall" };
var XPathArgumentRemainder = { label: "ArgumentRemainder" };
var XPathPathExpr = { label: "PathExpr" };
var XPathUnionExpr = { label: "UnionExpr" };
var XPathFilterExpr = { label: "FilterExpr" };
var XPathDigits = { label: "Digits" };

var xpathNonTerminals = [
    XPathLocationPath,
    XPathRelativeLocationPath,
    XPathAbsoluteLocationPath,
    XPathStep,
    XPathNodeTest,
    XPathPredicate,
    XPathLiteral,
    XPathExpr,
    XPathPrimaryExpr,
    XPathVariableReference,
    XPathNumber,
    XPathFunctionCall,
    XPathArgumentRemainder,
    XPathPathExpr,
    XPathUnionExpr,
    XPathFilterExpr,
    XPathDigits
];

// Quantifiers that are used in the productions of the grammar.
var Q_01 = { label: "?" };
var Q_MM = { label: "*" };
var Q_1M = { label: "+" };

// Tag for left associativity (right assoc is implied by undefined).
var ASSOC_LEFT = true;

// The productions of the grammar. Columns of the table:
//
// - target nonterminal,
// - pattern,
// - precedence,
// - semantic value factory
//
// The semantic value factory is a function that receives parse tree
// nodes from the stack frames of the matched symbols as arguments and
// returns an a node of the parse tree. The node is stored in the top
// stack frame along with the target object of the rule. The node in
// the parse tree is an expression object that has an evaluate() method
// and thus evaluates XPath expressions.
//
// The precedence is used to decide between reducing and shifting by
// comparing the precendence of the rule that is candidate for
// reducing with the precedence of the look ahead token. Precedence of
// -1 means that the precedence of the tokens in the pattern is used
// instead. TODO: It shouldn't be necessary to explicitly assign
// precedences to rules.

// DGF As it stands, these precedences are purely empirical; we're
// not sure they can be made to be consistent at all.

var xpathGrammarRules =
  [
   [ XPathLocationPath, [ XPathRelativeLocationPath ], 18,
     passExpr ],
   [ XPathLocationPath, [ XPathAbsoluteLocationPath ], 18,
     passExpr ],

   [ XPathAbsoluteLocationPath, [ TOK_SLASH, XPathRelativeLocationPath ], 18,
     makeLocationExpr1 ],
   [ XPathAbsoluteLocationPath, [ TOK_DSLASH, XPathRelativeLocationPath ], 18,
     makeLocationExpr2 ],

   [ XPathAbsoluteLocationPath, [ TOK_SLASH ], 0,
     makeLocationExpr3 ],
   [ XPathAbsoluteLocationPath, [ TOK_DSLASH ], 0,
     makeLocationExpr4 ],

   [ XPathRelativeLocationPath, [ XPathStep ], 31,
     makeLocationExpr5 ],
   [ XPathRelativeLocationPath,
     [ XPathRelativeLocationPath, TOK_SLASH, XPathStep ], 31,
     makeLocationExpr6 ],
   [ XPathRelativeLocationPath,
     [ XPathRelativeLocationPath, TOK_DSLASH, XPathStep ], 31,
     makeLocationExpr7 ],

   [ XPathStep, [ TOK_DOT ], 33,
     makeStepExpr1 ],
   [ XPathStep, [ TOK_DDOT ], 33,
     makeStepExpr2 ],
   [ XPathStep,
     [ TOK_AXISNAME, TOK_AXIS, XPathNodeTest ], 33,
     makeStepExpr3 ],
   [ XPathStep, [ TOK_AT, XPathNodeTest ], 33,
     makeStepExpr4 ],
   [ XPathStep, [ XPathNodeTest ], 33,
     makeStepExpr5 ],
   [ XPathStep, [ XPathStep, XPathPredicate ], 33,
     makeStepExpr6 ],

   [ XPathNodeTest, [ TOK_ASTERISK ], 33,
     makeNodeTestExpr1 ],
   [ XPathNodeTest, [ TOK_NCNAME, TOK_COLON, TOK_ASTERISK ], 33,
     makeNodeTestExpr2 ],
   [ XPathNodeTest, [ TOK_QNAME ], 33,
     makeNodeTestExpr3 ],
   [ XPathNodeTest, [ TOK_NODEO, TOK_PARENC ], 33,
     makeNodeTestExpr4 ],
   [ XPathNodeTest, [ TOK_NODEO, XPathLiteral, TOK_PARENC ], 33,
     makeNodeTestExpr5 ],

   [ XPathPredicate, [ TOK_BRACKO, XPathExpr, TOK_BRACKC ], 33,
     makePredicateExpr ],

   [ XPathPrimaryExpr, [ XPathVariableReference ], 33,
     passExpr ],
   [ XPathPrimaryExpr, [ TOK_PARENO, XPathExpr, TOK_PARENC ], 33,
     makePrimaryExpr ],
   [ XPathPrimaryExpr, [ XPathLiteral ], 30,
     passExpr ],
   [ XPathPrimaryExpr, [ XPathNumber ], 30,
     passExpr ],
   [ XPathPrimaryExpr, [ XPathFunctionCall ], 31,
     passExpr ],

   [ XPathFunctionCall, [ TOK_QNAME, TOK_PARENO, TOK_PARENC ], -1,
     makeFunctionCallExpr1 ],
   [ XPathFunctionCall,
     [ TOK_QNAME, TOK_PARENO, XPathExpr, XPathArgumentRemainder, Q_MM,
       TOK_PARENC ], -1,
     makeFunctionCallExpr2 ],
   [ XPathArgumentRemainder, [ TOK_COMMA, XPathExpr ], -1,
     makeArgumentExpr ],

   [ XPathUnionExpr, [ XPathPathExpr ], 20,
     passExpr ],
   [ XPathUnionExpr, [ XPathUnionExpr, TOK_PIPE, XPathPathExpr ], 20,
     makeUnionExpr ],

   [ XPathPathExpr, [ XPathLocationPath ], 20,
     passExpr ],
   [ XPathPathExpr, [ XPathFilterExpr ], 19,
     passExpr ],
   [ XPathPathExpr,
     [ XPathFilterExpr, TOK_SLASH, XPathRelativeLocationPath ], 19,
     makePathExpr1 ],
   [ XPathPathExpr,
     [ XPathFilterExpr, TOK_DSLASH, XPathRelativeLocationPath ], 19,
     makePathExpr2 ],

   [ XPathFilterExpr, [ XPathPrimaryExpr, XPathPredicate, Q_MM ], 31,
     makeFilterExpr ],

   [ XPathExpr, [ XPathPrimaryExpr ], 16,
     passExpr ],
   [ XPathExpr, [ XPathUnionExpr ], 16,
     passExpr ],

   [ XPathExpr, [ TOK_MINUS, XPathExpr ], -1,
     makeUnaryMinusExpr ],

   [ XPathExpr, [ XPathExpr, TOK_OR, XPathExpr ], -1,
     makeBinaryExpr ],
   [ XPathExpr, [ XPathExpr, TOK_AND, XPathExpr ], -1,
     makeBinaryExpr ],

   [ XPathExpr, [ XPathExpr, TOK_EQ, XPathExpr ], -1,
     makeBinaryExpr ],
   [ XPathExpr, [ XPathExpr, TOK_NEQ, XPathExpr ], -1,
     makeBinaryExpr ],

   [ XPathExpr, [ XPathExpr, TOK_LT, XPathExpr ], -1,
     makeBinaryExpr ],
   [ XPathExpr, [ XPathExpr, TOK_LE, XPathExpr ], -1,
     makeBinaryExpr ],
   [ XPathExpr, [ XPathExpr, TOK_GT, XPathExpr ], -1,
     makeBinaryExpr ],
   [ XPathExpr, [ XPathExpr, TOK_GE, XPathExpr ], -1,
     makeBinaryExpr ],

   [ XPathExpr, [ XPathExpr, TOK_PLUS, XPathExpr ], -1,
     makeBinaryExpr, ASSOC_LEFT ],
   [ XPathExpr, [ XPathExpr, TOK_MINUS, XPathExpr ], -1,
     makeBinaryExpr, ASSOC_LEFT ],

   [ XPathExpr, [ XPathExpr, TOK_ASTERISK, XPathExpr ], -1,
     makeBinaryExpr, ASSOC_LEFT ],
   [ XPathExpr, [ XPathExpr, TOK_DIV, XPathExpr ], -1,
     makeBinaryExpr, ASSOC_LEFT ],
   [ XPathExpr, [ XPathExpr, TOK_MOD, XPathExpr ], -1,
     makeBinaryExpr, ASSOC_LEFT ],

   [ XPathLiteral, [ TOK_LITERALQ ], -1,
     makeLiteralExpr ],
   [ XPathLiteral, [ TOK_LITERALQQ ], -1,
     makeLiteralExpr ],

   [ XPathNumber, [ TOK_NUMBER ], -1,
     makeNumberExpr ],

   [ XPathVariableReference, [ TOK_DOLLAR, TOK_QNAME ], 200,
     makeVariableReference ]
   ];

// That function computes some optimizations of the above data
// structures and will be called right here. It merely takes the
// counter variables out of the global scope.

var xpathRules = [];

function xpathParseInit() {
  if (xpathRules.length) {
    return;
  }

  // Some simple optimizations for the xpath expression parser: sort
  // grammar rules descending by length, so that the longest match is
  // first found.

  xpathGrammarRules.sort(function(a,b) {
    var la = a[1].length;
    var lb = b[1].length;
    if (la < lb) {
      return 1;
    } else if (la > lb) {
      return -1;
    } else {
      return 0;
    }
  });

  var k = 1;
  for (var i = 0; i < xpathNonTerminals.length; ++i) {
    xpathNonTerminals[i].key = k++;
  }

  for (i = 0; i < xpathTokenRules.length; ++i) {
    xpathTokenRules[i].key = k++;
  }

  xpathLog('XPath parse INIT: ' + k + ' rules');

  // Another slight optimization: sort the rules into bins according
  // to the last element (observing quantifiers), so we can restrict
  // the match against the stack to the subest of rules that match the
  // top of the stack.
  //
  // TODO(mesch): What we actually want is to compute states as in
  // bison, so that we don't have to do any explicit and iterated
  // match against the stack.

  function push_(array, position, element) {
    if (!array[position]) {
      array[position] = [];
    }
    array[position].push(element);
  }

  for (i = 0; i < xpathGrammarRules.length; ++i) {
    var rule = xpathGrammarRules[i];
    var pattern = rule[1];

    for (var j = pattern.length - 1; j >= 0; --j) {
      if (pattern[j] == Q_1M) {
        push_(xpathRules, pattern[j-1].key, rule);
        break;

      } else if (pattern[j] == Q_MM || pattern[j] == Q_01) {
        push_(xpathRules, pattern[j-1].key, rule);
        --j;

      } else {
        push_(xpathRules, pattern[j].key, rule);
        break;
      }
    }
  }

  xpathLog('XPath parse INIT: ' + xpathRules.length + ' rule bins');

  var sum = 0;
  mapExec(xpathRules, function(i) {
    if (i) {
      sum += i.length;
    }
  });

  xpathLog('XPath parse INIT: ' + (sum / xpathRules.length) +
           ' average bin size');
}

// Local utility functions that are used by the lexer or parser.

function xpathCollectDescendants(nodelist, node, opt_tagName) {
  if (opt_tagName && node.getElementsByTagName) {
    copyArray(nodelist, node.getElementsByTagName(opt_tagName));
    return;
  }
  for (var n = node.firstChild; n; n = n.nextSibling) {
    nodelist.push(n);
    xpathCollectDescendants(nodelist, n);
  }
}

/**
 * DGF - extract a tag name suitable for getElementsByTagName
 *
 * @param nodetest                     the node test
 * @param ignoreNonElementNodesForNTA  if true, the node list returned when
 *                                     evaluating "node()" will not contain
 *                                     non-element nodes. This can boost
 *                                     performance. This is false by default.
 */
function xpathExtractTagNameFromNodeTest(nodetest, ignoreNonElementNodesForNTA) {
  if (nodetest instanceof NodeTestName) {
    return nodetest.name;
  }
  if ((ignoreNonElementNodesForNTA && nodetest instanceof NodeTestAny) ||
    nodetest instanceof NodeTestElementOrAttribute) {
    return "*";
  }
}

function xpathCollectDescendantsReverse(nodelist, node) {
  for (var n = node.lastChild; n; n = n.previousSibling) {
    nodelist.push(n);
    xpathCollectDescendantsReverse(nodelist, n);
  }
}


// The entry point for the library: match an expression against a DOM
// node. Returns an XPath value.
function xpathDomEval(expr, node) {
  var expr1 = xpathParse(expr);
  var ret = expr1.evaluate(new ExprContext(node));
  return ret;
}

// Utility function to sort a list of nodes. Used by xsltSort() and
// nxslSelect().
function xpathSort(input, sort) {
  if (sort.length == 0) {
    return;
  }

  var sortlist = [];

  for (var i = 0; i < input.contextSize(); ++i) {
    var node = input.nodelist[i];
    var sortitem = { node: node, key: [] };
    var context = input.clone(node, 0, [ node ]);

    for (var j = 0; j < sort.length; ++j) {
      var s = sort[j];
      var value = s.expr.evaluate(context);

      var evalue;
      if (s.type == 'text') {
        evalue = value.stringValue();
      } else if (s.type == 'number') {
        evalue = value.numberValue();
      }
      sortitem.key.push({ value: evalue, order: s.order });
    }

    // Make the sort stable by adding a lowest priority sort by
    // id. This is very convenient and furthermore required by the
    // spec ([XSLT] - Section 10 Sorting).
    sortitem.key.push({ value: i, order: 'ascending' });

    sortlist.push(sortitem);
  }

  sortlist.sort(xpathSortByKey);

  var nodes = [];
  for (var i = 0; i < sortlist.length; ++i) {
    nodes.push(sortlist[i].node);
  }
  input.nodelist = nodes;
  input.setNode(0);
}


// Sorts by all order criteria defined. According to the JavaScript
// spec ([ECMA] Section 11.8.5), the compare operators compare strings
// as strings and numbers as numbers.
//
// NOTE: In browsers which do not follow the spec, this breaks only in
// the case that numbers should be sorted as strings, which is very
// uncommon.
function xpathSortByKey(v1, v2) {
  // NOTE: Sort key vectors of different length never occur in
  // xsltSort.

  for (var i = 0; i < v1.key.length; ++i) {
    var o = v1.key[i].order == 'descending' ? -1 : 1;
    if (v1.key[i].value > v2.key[i].value) {
      return +1 * o;
    } else if (v1.key[i].value < v2.key[i].value) {
      return -1 * o;
    }
  }

  return 0;
}


// Parses and then evaluates the given XPath expression in the given
// input context. Notice that parsed xpath expressions are cached.
function xpathEval(select, context) {
  var expr = xpathParse(select);
  var ret = expr.evaluate(context);
  return ret;
}
/*
 * Copyright 2004 ThoughtWorks, Inc
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

// TODO: stop navigating this.browserbot.document() ... it breaks encapsulation

var storedVars = new Object();

function Selenium(browserbot) {
    /**
     * Defines an object that runs Selenium commands.
     *
     * <h3><a name="locators"></a>Element Locators</h3>
     * <p>
     * Element Locators tell Selenium which HTML element a command refers to.
     * The format of a locator is:</p>
     * <blockquote>
     * <em>locatorType</em><strong>=</strong><em>argument</em>
     * </blockquote>
     *
     * <p>
     * We support the following strategies for locating elements:
     * </p>
     * 
     * <ul>
     * <li><strong>identifier</strong>=<em>id</em>: 
     * Select the element with the specified &#064;id attribute. If no match is
     * found, select the first element whose &#064;name attribute is <em>id</em>.
     * (This is normally the default; see below.)</li>
     * <li><strong>id</strong>=<em>id</em>:
     * Select the element with the specified &#064;id attribute.</li>
     *
     * <li><strong>name</strong>=<em>name</em>:
     * Select the first element with the specified &#064;name attribute.
     * <ul class="first last simple">
     * <li>username</li>
     * <li>name=username</li>
     * </ul>
     * 
     * <p>The name may optionally be followed by one or more <em>element-filters</em>, separated from the name by whitespace.  If the <em>filterType</em> is not specified, <strong>value</strong> is assumed.</p>
     *
     * <ul class="first last simple">
     * <li>name=flavour value=chocolate</li>
     * </ul>
     * </li>
     * <li><strong>dom</strong>=<em>javascriptExpression</em>: 
     *
     * Find an element by evaluating the specified string.  This allows you to traverse the HTML Document Object
     * Model using JavaScript.  Note that you must not return a value in this string; simply make it the last expression in the block.
     * <ul class="first last simple">
     * <li>dom=document.forms['myForm'].myDropdown</li>
     * <li>dom=document.images[56]</li>
     * <li>dom=function foo() { return document.links[1]; }; foo();</li>
     * </ul>
     *
     * </li>
     *
     * <li><strong>xpath</strong>=<em>xpathExpression</em>: 
     * Locate an element using an XPath expression.
     * <ul class="first last simple">
     * <li>xpath=//img[&#064;alt='The image alt text']</li>
     * <li>xpath=//table[&#064;id='table1']//tr[4]/td[2]</li>
     * <li>xpath=//a[contains(&#064;href,'#id1')]</li>
     * <li>xpath=//a[contains(&#064;href,'#id1')]/&#064;class</li>
     * <li>xpath=(//table[&#064;class='stylee'])//th[text()='theHeaderText']/../td</li>
     * <li>xpath=//input[&#064;name='name2' and &#064;value='yes']</li>
     * <li>xpath=//*[text()="right"]</li>
     *
     * </ul>
     * </li>
     * <li><strong>link</strong>=<em>textPattern</em>:
     * Select the link (anchor) element which contains text matching the
     * specified <em>pattern</em>.
     * <ul class="first last simple">
     * <li>link=The link text</li>
     * </ul>
     *
     * </li>
     *
     * <li><strong>css</strong>=<em>cssSelectorSyntax</em>:
     * Select the element using css selectors. Please refer to <a href="http://www.w3.org/TR/REC-CSS2/selector.html">CSS2 selectors</a>, <a href="http://www.w3.org/TR/2001/CR-css3-selectors-20011113/">CSS3 selectors</a> for more information. You can also check the TestCssLocators test in the selenium test suite for an example of usage, which is included in the downloaded selenium core package.
     * <ul class="first last simple">
     * <li>css=a[href="#id3"]</li>
     * <li>css=span#firstChild + span</li>
     * </ul>
     * <p>Currently the css selector locator supports all css1, css2 and css3 selectors except namespace in css3, some pseudo classes(:nth-of-type, :nth-last-of-type, :first-of-type, :last-of-type, :only-of-type, :visited, :hover, :active, :focus, :indeterminate) and pseudo elements(::first-line, ::first-letter, ::selection, ::before, ::after). </p>
     * </li>
     * 
     * <li><strong>ui</strong>=<em>uiSpecifierString</em>:
     * Locate an element by resolving the UI specifier string to another locator, and evaluating it. See the <a href="http://svn.openqa.org/fisheye/browse/~raw,r=trunk/selenium/trunk/src/main/resources/core/scripts/ui-doc.html">Selenium UI-Element Reference</a> for more details.
     * <ul class="first last simple">
     * <li>ui=loginPages::loginButton()</li>
     * <li>ui=settingsPages::toggle(label=Hide Email)</li>
     * <li>ui=forumPages::postBody(index=2)//a[2]</li>
     * </ul>
     * </li>
     *
     * </ul>
     *
     * <p>
     * Without an explicit locator prefix, Selenium uses the following default
     * strategies:
     * </p>
     *
     * <ul class="simple">
     * <li><strong>dom</strong>, for locators starting with &quot;document.&quot;</li>
     * <li><strong>xpath</strong>, for locators starting with &quot;//&quot;</li>
     * <li><strong>identifier</strong>, otherwise</li>
     * </ul>
     *
     * <h3><a name="element-filters">Element Filters</a></h3>
     * <blockquote>
     * <p>Element filters can be used with a locator to refine a list of candidate elements.  They are currently used only in the 'name' element-locator.</p>
     * <p>Filters look much like locators, ie.</p>
     * <blockquote>
     * <em>filterType</em><strong>=</strong><em>argument</em></blockquote>
     *
     * <p>Supported element-filters are:</p>
     * <p><strong>value=</strong><em>valuePattern</em></p>
     * <blockquote>
     * Matches elements based on their values.  This is particularly useful for refining a list of similarly-named toggle-buttons.</blockquote>
     * <p><strong>index=</strong><em>index</em></p>
     * <blockquote>
     * Selects a single element based on its position in the list (offset from zero).</blockquote>
     * </blockquote>
     *
     * <h3><a name="patterns"></a>String-match Patterns</h3>
     *
     * <p>
     * Various Pattern syntaxes are available for matching string values:
     * </p>
     * <ul>
     * <li><strong>glob:</strong><em>pattern</em>:
     * Match a string against a "glob" (aka "wildmat") pattern. "Glob" is a
     * kind of limited regular-expression syntax typically used in command-line
     * shells. In a glob pattern, "*" represents any sequence of characters, and "?"
     * represents any single character. Glob patterns match against the entire
     * string.</li>
     * <li><strong>regexp:</strong><em>regexp</em>:
     * Match a string using a regular-expression. The full power of JavaScript
     * regular-expressions is available.</li>
     * <li><strong>regexpi:</strong><em>regexpi</em>:
     * Match a string using a case-insensitive regular-expression.</li>
     * <li><strong>exact:</strong><em>string</em>:
     *
     * Match a string exactly, verbatim, without any of that fancy wildcard
     * stuff.</li>
     * </ul>
     * <p>
     * If no pattern prefix is specified, Selenium assumes that it's a "glob"
     * pattern.
     * </p>
     * <p>
     * For commands that return multiple values (such as verifySelectOptions),
     * the string being matched is a comma-separated list of the return values,
     * where both commas and backslashes in the values are backslash-escaped.
     * When providing a pattern, the optional matching syntax (i.e. glob,
     * regexp, etc.) is specified once, as usual, at the beginning of the
     * pattern.
     * </p>
     */
    this.browserbot = browserbot;
    this.optionLocatorFactory = new OptionLocatorFactory();
    // DGF for backwards compatibility
    this.page = function() {
        return browserbot;
    };
    this.defaultTimeout = Selenium.DEFAULT_TIMEOUT;
    this.mouseSpeed = Selenium.DEFAULT_MOUSE_SPEED;
}

Selenium.DEFAULT_TIMEOUT = 30 * 1000;
Selenium.DEFAULT_MOUSE_SPEED = 10;
Selenium.RIGHT_MOUSE_CLICK = 2;

Selenium.decorateFunctionWithTimeout = function(f, timeout) {
    if (f == null) {
        return null;
    }
    
    var timeoutTime = getTimeoutTime(timeout);
    
    return function() {
        if (new Date().getTime() > timeoutTime) {
            throw new SeleniumError("Timed out after " + timeout + "ms");
        }
        return f();
    };
}

Selenium.createForWindow = function(window, proxyInjectionMode) {
    if (!window.location) {
        throw "error: not a window!";
    }
    return new Selenium(BrowserBot.createForWindow(window, proxyInjectionMode));
};

Selenium.prototype.reset = function() {
    this.defaultTimeout = Selenium.DEFAULT_TIMEOUT;
    // todo: this.browserbot.reset()
    this.browserbot.selectWindow("null");
    this.browserbot.resetPopups();
};

Selenium.prototype.doClick = function(locator) {
    /**
   * Clicks on a link, button, checkbox or radio button. If the click action
   * causes a new page to load (like a link usually does), call
   * waitForPageToLoad.
   *
   * @param locator an element locator
   *
   */
    var element = this.browserbot.findElement(locator);
    var elementWithHref = getAncestorOrSelfWithJavascriptHref(element);
   
    if (browserVersion.isChrome && elementWithHref != null) {
        // SEL-621: Firefox chrome: Race condition bug in alert-handling code
        //
        // This appears to be because javascript href's are being executed in a
        // separate thread from the main thread when running in chrome mode.
        //
        // This workaround injects a callback into the executing href that
        // lowers a flag, which is initially raised. Execution of this click
        // command will wait for the flag to be lowered.
        
        var win = elementWithHref.ownerDocument.defaultView;
        var originalLocation = win.location.href;
        var originalHref = elementWithHref.href;
        
        elementWithHref.href = 'javascript:try { '
            + originalHref.replace(/^\s*javascript:/i, "")
            + ' } finally { window._executingJavascriptHref = undefined; }' ;
        
        win._executingJavascriptHref = true;
        
        this.browserbot.clickElement(element);
        
        return Selenium.decorateFunctionWithTimeout(function() {
            if (win.closed) {
                return true;
            }
            if (win.location.href != originalLocation) {
                // navigated to some other page ... javascript from previous
                // page can't still be executing!
                return true;
            }
            if (! win._executingJavascriptHref) {
                try {
                    elementWithHref.href = originalHref;
                }
                catch (e) {
                    // maybe the javascript removed the element ... should be
                    // no danger in not reverting its href attribute
                }
                return true;
            }
            
            return false;
        }, this.defaultTimeout);
    }
    
    this.browserbot.clickElement(element);
};

Selenium.prototype.doDoubleClick = function(locator) {
    /**
   * Double clicks on a link, button, checkbox or radio button. If the double click action
   * causes a new page to load (like a link usually does), call
   * waitForPageToLoad.
   *
   * @param locator an element locator
   *
   */
   var element = this.browserbot.findElement(locator);
   this.browserbot.doubleClickElement(element);
};

Selenium.prototype.doContextMenu = function(locator) {
    /**
   * Simulates opening the context menu for the specified element (as might happen if the user "right-clicked" on the element).
   *
   * @param locator an element locator
   *
   */
   var element = this.browserbot.findElement(locator);
   this.browserbot.contextMenuOnElement(element);
};

Selenium.prototype.doClickAt = function(locator, coordString) {
    /**
   * Clicks on a link, button, checkbox or radio button. If the click action
   * causes a new page to load (like a link usually does), call
   * waitForPageToLoad.
   *
   * @param locator an element locator
   * @param coordString specifies the x,y position (i.e. - 10,20) of the mouse
   *      event relative to the element returned by the locator.
   *
   */
    var element = this.browserbot.findElement(locator);
    var clientXY = getClientXY(element, coordString)
    this.doMouseMove(locator);
    this.doMouseDown(locator);
    this.browserbot.clickElement(element, clientXY[0], clientXY[1]);
    this.doMouseUp(locator);
};

Selenium.prototype.doDoubleClickAt = function(locator, coordString) {
    /**
   * Doubleclicks on a link, button, checkbox or radio button. If the action
   * causes a new page to load (like a link usually does), call
   * waitForPageToLoad.
   *
   * @param locator an element locator
   * @param coordString specifies the x,y position (i.e. - 10,20) of the mouse
   *      event relative to the element returned by the locator.
   *
   */
    var element = this.browserbot.findElement(locator);
    var clientXY = getClientXY(element, coordString)
    this.doMouseMove(locator);
    this.doMouseDown(locator);
    this.browserbot.doubleClickElement(element, clientXY[0], clientXY[1]);
    this.doMouseUp(locator);
};

Selenium.prototype.doContextMenuAt = function(locator, coordString) {
    /**
   * Simulates opening the context menu for the specified element (as might happen if the user "right-clicked" on the element).
   *
   * @param locator an element locator
   * @param coordString specifies the x,y position (i.e. - 10,20) of the mouse
   *      event relative to the element returned by the locator.
   *
   */
    var element = this.browserbot.findElement(locator);
    var clientXY = getClientXY(element, coordString)
    this.browserbot.contextMenuOnElement(element, clientXY[0], clientXY[1]);
};

Selenium.prototype.doFireEvent = function(locator, eventName) {
    /**
   * Explicitly simulate an event, to trigger the corresponding &quot;on<em>event</em>&quot;
   * handler.
   *
   * @param locator an <a href="#locators">element locator</a>
   * @param eventName the event name, e.g. "focus" or "blur"
   */
    var element = this.browserbot.findElement(locator);
    triggerEvent(element, eventName, false);
};

Selenium.prototype.doFocus = function(locator) {
    /** Move the focus to the specified element; for example, if the element is an input field, move the cursor to that field.
    *
    * @param locator an <a href="#locators">element locator</a>
    */
    var element = this.browserbot.findElement(locator);
    if (element.focus) {
        element.focus();
    } else {
         triggerEvent(element, "focus", false);
    }
}

Selenium.prototype.doKeyPress = function(locator, keySequence) {
    /**
   * Simulates a user pressing and releasing a key.
   *
   * @param locator an <a href="#locators">element locator</a>
   * @param keySequence Either be a string("\" followed by the numeric keycode
   *  of the key to be pressed, normally the ASCII value of that key), or a single
   *  character. For example: "w", "\119".
   */
    var element = this.browserbot.findElement(locator);
    triggerKeyEvent(element, 'keypress', keySequence, true, 
        this.browserbot.controlKeyDown, 
        this.browserbot.altKeyDown, 
            this.browserbot.shiftKeyDown,
            this.browserbot.metaKeyDown);
};

Selenium.prototype.doShiftKeyDown = function() {
    /**
   * Press the shift key and hold it down until doShiftUp() is called or a new page is loaded.
   *
   */
   this.browserbot.shiftKeyDown = true;
};

Selenium.prototype.doShiftKeyUp = function() {
    /**
   * Release the shift key.
   *
   */
   this.browserbot.shiftKeyDown = false;
};

Selenium.prototype.doMetaKeyDown = function() {
    /**
   * Press the meta key and hold it down until doMetaUp() is called or a new page is loaded.
   *
   */
   this.browserbot.metaKeyDown = true;
};

Selenium.prototype.doMetaKeyUp = function() {
    /**
   * Release the meta key.
   *
   */
   this.browserbot.metaKeyDown = false;
};

Selenium.prototype.doAltKeyDown = function() {
    /**
   * Press the alt key and hold it down until doAltUp() is called or a new page is loaded.
   *
   */
   this.browserbot.altKeyDown = true;
};

Selenium.prototype.doAltKeyUp = function() {
    /**
   * Release the alt key.
   *
   */
   this.browserbot.altKeyDown = false;
};

Selenium.prototype.doControlKeyDown = function() {
    /**
   * Press the control key and hold it down until doControlUp() is called or a new page is loaded.
   *
   */
   this.browserbot.controlKeyDown = true;
};

Selenium.prototype.doControlKeyUp = function() {
    /**
   * Release the control key.
   *
   */
   this.browserbot.controlKeyDown = false;
};

Selenium.prototype.doKeyDown = function(locator, keySequence) {
    /**
   * Simulates a user pressing a key (without releasing it yet).
   *
   * @param locator an <a href="#locators">element locator</a>
   * @param keySequence Either be a string("\" followed by the numeric keycode
   *  of the key to be pressed, normally the ASCII value of that key), or a single
   *  character. For example: "w", "\119".
   */
    var element = this.browserbot.findElement(locator);
    triggerKeyEvent(element, 'keydown', keySequence, true,
        this.browserbot.controlKeyDown, 
            this.browserbot.altKeyDown, 
            this.browserbot.shiftKeyDown, 
            this.browserbot.metaKeyDown);
};

Selenium.prototype.doKeyUp = function(locator, keySequence) {
    /**
   * Simulates a user releasing a key.
   *
   * @param locator an <a href="#locators">element locator</a>
   * @param keySequence Either be a string("\" followed by the numeric keycode
   *  of the key to be pressed, normally the ASCII value of that key), or a single
   *  character. For example: "w", "\119".
   */
    var element = this.browserbot.findElement(locator);
    triggerKeyEvent(element, 'keyup', keySequence, true,
        this.browserbot.controlKeyDown, 
            this.browserbot.altKeyDown, 
        this.browserbot.shiftKeyDown,
        this.browserbot.metaKeyDown);
};

function getClientXY(element, coordString) {
   // Parse coordString
   var coords = null;
   var x;
   var y;
   if (coordString) {
      coords = coordString.split(/,/);
      x = Number(coords[0]);
      y = Number(coords[1]);
   }
   else {
      x = y = 0;
   }

   // Get position of element,
   // Return 2 item array with clientX and clientY
   return [Selenium.prototype.getElementPositionLeft(element) + x, Selenium.prototype.getElementPositionTop(element) + y];
}

Selenium.prototype.doMouseOver = function(locator) {
    /**
   * Simulates a user hovering a mouse over the specified element.
   *
   * @param locator an <a href="#locators">element locator</a>
   */
    var element = this.browserbot.findElement(locator);
    this.browserbot.triggerMouseEvent(element, 'mouseover', true);
};

Selenium.prototype.doMouseOut = function(locator) {
   /**
   * Simulates a user moving the mouse pointer away from the specified element.
   *
   * @param locator an <a href="#locators">element locator</a>
   */
    var element = this.browserbot.findElement(locator);
    this.browserbot.triggerMouseEvent(element, 'mouseout', true);
};

Selenium.prototype.doMouseDown = function(locator) {
    /**
   * Simulates a user pressing the left mouse button (without releasing it yet) on
   * the specified element.
   *
   * @param locator an <a href="#locators">element locator</a>
   */
   var element = this.browserbot.findElement(locator);
   this.browserbot.triggerMouseEvent(element, 'mousedown', true);
};

Selenium.prototype.doMouseDownRight = function(locator) {
    /**
   * Simulates a user pressing the right mouse button (without releasing it yet) on
   * the specified element.
   *
   * @param locator an <a href="#locators">element locator</a>
   */
   var element = this.browserbot.findElement(locator);
   this.browserbot.triggerMouseEvent(element, 'mousedown', true, undefined, undefined, Selenium.RIGHT_MOUSE_CLICK);
};

Selenium.prototype.doMouseDownAt = function(locator, coordString) {
    /**
   * Simulates a user pressing the left mouse button (without releasing it yet) at
   * the specified location.
   *
   * @param locator an <a href="#locators">element locator</a>
   * @param coordString specifies the x,y position (i.e. - 10,20) of the mouse
   *      event relative to the element returned by the locator.
   */
    var element = this.browserbot.findElement(locator);
    var clientXY = getClientXY(element, coordString)

    this.browserbot.triggerMouseEvent(element, 'mousedown', true, clientXY[0], clientXY[1]);
};

Selenium.prototype.doMouseDownRightAt = function(locator, coordString) {
    /**
   * Simulates a user pressing the right mouse button (without releasing it yet) at
   * the specified location.
   *
   * @param locator an <a href="#locators">element locator</a>
   * @param coordString specifies the x,y position (i.e. - 10,20) of the mouse
   *      event relative to the element returned by the locator.
   */
    var element = this.browserbot.findElement(locator);
    var clientXY = getClientXY(element, coordString)

    this.browserbot.triggerMouseEvent(element, 'mousedown', true, clientXY[0], clientXY[1], Selenium.RIGHT_MOUSE_CLICK);
};

Selenium.prototype.doMouseUp = function(locator) {
    /**
   * Simulates the event that occurs when the user releases the mouse button (i.e., stops
   * holding the button down) on the specified element.
   *
   * @param locator an <a href="#locators">element locator</a>
   */
   var element = this.browserbot.findElement(locator);
   this.browserbot.triggerMouseEvent(element, 'mouseup', true);
};

Selenium.prototype.doMouseUpRight = function(locator) {
    /**
   * Simulates the event that occurs when the user releases the right mouse button (i.e., stops
   * holding the button down) on the specified element.
   *
   * @param locator an <a href="#locators">element locator</a>
   */
   var element = this.browserbot.findElement(locator);
   this.browserbot.triggerMouseEvent(element, 'mouseup', true, undefined, undefined, Selenium.RIGHT_MOUSE_CLICK);
};

Selenium.prototype.doMouseUpAt = function(locator, coordString) {
    /**
   * Simulates the event that occurs when the user releases the mouse button (i.e., stops
   * holding the button down) at the specified location.
   *
   * @param locator an <a href="#locators">element locator</a>
   * @param coordString specifies the x,y position (i.e. - 10,20) of the mouse
   *      event relative to the element returned by the locator.
   */
    var element = this.browserbot.findElement(locator);
    var clientXY = getClientXY(element, coordString)

    this.browserbot.triggerMouseEvent(element, 'mouseup', true, clientXY[0], clientXY[1]);
};

Selenium.prototype.doMouseUpRightAt = function(locator, coordString) {
    /**
   * Simulates the event that occurs when the user releases the right mouse button (i.e., stops
   * holding the button down) at the specified location.
   *
   * @param locator an <a href="#locators">element locator</a>
   * @param coordString specifies the x,y position (i.e. - 10,20) of the mouse
   *      event relative to the element returned by the locator.
   */
    var element = this.browserbot.findElement(locator);
    var clientXY = getClientXY(element, coordString)

    this.browserbot.triggerMouseEvent(element, 'mouseup', true, clientXY[0], clientXY[1], Selenium.RIGHT_MOUSE_CLICK);
};

Selenium.prototype.doMouseMove = function(locator) {
    /**
   * Simulates a user pressing the mouse button (without releasing it yet) on
   * the specified element.
   *
   * @param locator an <a href="#locators">element locator</a>
   */
   var element = this.browserbot.findElement(locator);
   this.browserbot.triggerMouseEvent(element, 'mousemove', true);
};

Selenium.prototype.doMouseMoveAt = function(locator, coordString) {
    /**
   * Simulates a user pressing the mouse button (without releasing it yet) on
   * the specified element.
   *
   * @param locator an <a href="#locators">element locator</a>
   * @param coordString specifies the x,y position (i.e. - 10,20) of the mouse
   *      event relative to the element returned by the locator.
   */

    var element = this.browserbot.findElement(locator);
    var clientXY = getClientXY(element, coordString)

    this.browserbot.triggerMouseEvent(element, 'mousemove', true, clientXY[0], clientXY[1]);
};

Selenium.prototype.doType = function(locator, value) {
    /**
   * Sets the value of an input field, as though you typed it in.
   *
   * <p>Can also be used to set the value of combo boxes, check boxes, etc. In these cases,
   * value should be the value of the option selected, not the visible text.</p>
   *
   * @param locator an <a href="#locators">element locator</a>
   * @param value the value to type
   */
   if (this.browserbot.controlKeyDown || this.browserbot.altKeyDown || this.browserbot.metaKeyDown) {
        throw new SeleniumError("type not supported immediately after call to controlKeyDown() or altKeyDown() or metaKeyDown()");
    }
        // TODO fail if it can't be typed into.
    var element = this.browserbot.findElement(locator);
    if (this.browserbot.shiftKeyDown) {
        value = new String(value).toUpperCase();
    }
    this.browserbot.replaceText(element, value);
};

Selenium.prototype.doTypeKeys = function(locator, value) {
    /**
    * Simulates keystroke events on the specified element, as though you typed the value key-by-key.
    *
    * <p>This is a convenience method for calling keyDown, keyUp, keyPress for every character in the specified string;
    * this is useful for dynamic UI widgets (like auto-completing combo boxes) that require explicit key events.</p>
    * 
    * <p>Unlike the simple "type" command, which forces the specified value into the page directly, this command
    * may or may not have any visible effect, even in cases where typing keys would normally have a visible effect.
    * For example, if you use "typeKeys" on a form element, you may or may not see the results of what you typed in
    * the field.</p>
    * <p>In some cases, you may need to use the simple "type" command to set the value of the field and then the "typeKeys" command to
    * send the keystroke events corresponding to what you just typed.</p>
    *
    * @param locator an <a href="#locators">element locator</a>
    * @param value the value to type
    */
    var keys = new String(value).split("");
    for (var i = 0; i < keys.length; i++) {
        var c = keys[i];
        this.doKeyDown(locator, c);
        this.doKeyUp(locator, c);
        this.doKeyPress(locator, c);
    }
};

Selenium.prototype.doSetSpeed = function(value) {
 /**
 * Set execution speed (i.e., set the millisecond length of a delay which will follow each selenium operation).  By default, there is no such delay, i.e.,
 * the delay is 0 milliseconds.
   *
   * @param value the number of milliseconds to pause after operation
   */
   throw new SeleniumError("this operation is only implemented in selenium-rc, and should never result in a request making it across the wire");
};

Selenium.prototype.getSpeed = function() {
 /**
 * Get execution speed (i.e., get the millisecond length of the delay following each selenium operation).  By default, there is no such delay, i.e.,
 * the delay is 0 milliseconds.
   *
   * See also setSpeed.
   *
   * @return string the execution speed in milliseconds.
   */
   throw new SeleniumError("this operation is only implemented in selenium-rc, and should never result in a request making it across the wire");
};

Selenium.prototype.findToggleButton = function(locator) {
    var element = this.browserbot.findElement(locator);
    if (element.checked == null) {
        Assert.fail("Element " + locator + " is not a toggle-button.");
    }
    return element;
}

Selenium.prototype.doCheck = function(locator) {
    /**
   * Check a toggle-button (checkbox/radio)
   *
   * @param locator an <a href="#locators">element locator</a>
   */
    this.findToggleButton(locator).checked = true;
};

Selenium.prototype.doUncheck = function(locator) {
    /**
   * Uncheck a toggle-button (checkbox/radio)
   *
   * @param locator an <a href="#locators">element locator</a>
   */
    this.findToggleButton(locator).checked = false;
};

Selenium.prototype.doSelect = function(selectLocator, optionLocator) {
    /**
   * Select an option from a drop-down using an option locator.
   *
   * <p>
   * Option locators provide different ways of specifying options of an HTML
   * Select element (e.g. for selecting a specific option, or for asserting
   * that the selected option satisfies a specification). There are several
   * forms of Select Option Locator.
   * </p>
   * <ul>
   * <li><strong>label</strong>=<em>labelPattern</em>:
   * matches options based on their labels, i.e. the visible text. (This
   * is the default.)
   * <ul class="first last simple">
   * <li>label=regexp:^[Oo]ther</li>
   * </ul>
   * </li>
   * <li><strong>value</strong>=<em>valuePattern</em>:
   * matches options based on their values.
   * <ul class="first last simple">
   * <li>value=other</li>
   * </ul>
   *
   *
   * </li>
   * <li><strong>id</strong>=<em>id</em>:
   *
   * matches options based on their ids.
   * <ul class="first last simple">
   * <li>id=option1</li>
   * </ul>
   * </li>
   * <li><strong>index</strong>=<em>index</em>:
   * matches an option based on its index (offset from zero).
   * <ul class="first last simple">
   *
   * <li>index=2</li>
   * </ul>
   * </li>
   * </ul>
   * <p>
   * If no option locator prefix is provided, the default behaviour is to match on <strong>label</strong>.
   * </p>
   *
   *
   * @param selectLocator an <a href="#locators">element locator</a> identifying a drop-down menu
   * @param optionLocator an option locator (a label by default)
   */
    var element = this.browserbot.findElement(selectLocator);
    if (!("options" in element)) {
        throw new SeleniumError("Specified element is not a Select (has no options)");
    }
    var locator = this.optionLocatorFactory.fromLocatorString(optionLocator);
    var option = locator.findOption(element);
    this.browserbot.selectOption(element, option);
};



Selenium.prototype.doAddSelection = function(locator, optionLocator) {
    /**
   * Add a selection to the set of selected options in a multi-select element using an option locator.
   *
   * @see #doSelect for details of option locators
   *
   * @param locator an <a href="#locators">element locator</a> identifying a multi-select box
   * @param optionLocator an option locator (a label by default)
   */
    var element = this.browserbot.findElement(locator);
    if (!("options" in element)) {
        throw new SeleniumError("Specified element is not a Select (has no options)");
    }
    var locator = this.optionLocatorFactory.fromLocatorString(optionLocator);
    var option = locator.findOption(element);
    this.browserbot.addSelection(element, option);
};

Selenium.prototype.doRemoveSelection = function(locator, optionLocator) {
    /**
   * Remove a selection from the set of selected options in a multi-select element using an option locator.
   *
   * @see #doSelect for details of option locators
   *
   * @param locator an <a href="#locators">element locator</a> identifying a multi-select box
   * @param optionLocator an option locator (a label by default)
   */

    var element = this.browserbot.findElement(locator);
    if (!("options" in element)) {
        throw new SeleniumError("Specified element is not a Select (has no options)");
    }
    var locator = this.optionLocatorFactory.fromLocatorString(optionLocator);
    var option = locator.findOption(element);
    this.browserbot.removeSelection(element, option);
};

Selenium.prototype.doRemoveAllSelections = function(locator) {
    /**
    * Unselects all of the selected options in a multi-select element.
    *
    * @param locator an <a href="#locators">element locator</a> identifying a multi-select box
    */
    var element = this.browserbot.findElement(locator);
    if (!("options" in element)) {
        throw new SeleniumError("Specified element is not a Select (has no options)");
    }
    for (var i = 0; i < element.options.length; i++) {
        this.browserbot.removeSelection(element, element.options[i]);
    }
}

Selenium.prototype.doSubmit = function(formLocator) {
    /**
   * Submit the specified form. This is particularly useful for forms without
   * submit buttons, e.g. single-input "Search" forms.
   *
   * @param formLocator an <a href="#locators">element locator</a> for the form you want to submit
   */
    var form = this.browserbot.findElement(formLocator);
    return this.browserbot.submit(form);

};

Selenium.prototype.makePageLoadCondition = function(timeout) {
    if (timeout == null) {
        timeout = this.defaultTimeout;
    }
    // if the timeout is zero, we won't wait for the page to load before returning
    if (timeout == 0) {
    	  return;
    }
    return Selenium.decorateFunctionWithTimeout(fnBind(this._isNewPageLoaded, this), timeout);
};

Selenium.prototype.doOpen = function(url) {
    /**
   * Opens an URL in the test frame. This accepts both relative and absolute
   * URLs.
   *
   * The &quot;open&quot; command waits for the page to load before proceeding,
   * ie. the &quot;AndWait&quot; suffix is implicit.
   *
   * <em>Note</em>: The URL must be on the same domain as the runner HTML
   * due to security restrictions in the browser (Same Origin Policy). If you
   * need to open an URL on another domain, use the Selenium Server to start a
   * new browser session on that domain.
   *
   * @param url the URL to open; may be relative or absolute
   */
    this.browserbot.openLocation(url);
    if (window["proxyInjectionMode"] == null || !window["proxyInjectionMode"]) {
        return this.makePageLoadCondition();
    } // in PI mode, just return "OK"; the server will waitForLoad
};

Selenium.prototype.doOpenWindow = function(url, windowID) {
    /**
   * Opens a popup window (if a window with that ID isn't already open).
   * After opening the window, you'll need to select it using the selectWindow
   * command.
   * 
   * <p>This command can also be a useful workaround for bug SEL-339.  In some cases, Selenium will be unable to intercept a call to window.open (if the call occurs during or before the "onLoad" event, for example).
   * In those cases, you can force Selenium to notice the open window's name by using the Selenium openWindow command, using
   * an empty (blank) url, like this: openWindow("", "myFunnyWindow").</p>
   *
   * @param url the URL to open, which can be blank 
   * @param windowID the JavaScript window ID of the window to select
   */
   this.browserbot.openWindow(url, windowID);
};

Selenium.prototype.doSelectWindow = function(windowID) {
    /**
   * Selects a popup window using a window locator; once a popup window has been selected, all
   * commands go to that window. To select the main window again, use null
   * as the target.
   *
   * <p>
   * 
   * Window locators provide different ways of specifying the window object:
   * by title, by internal JavaScript "name," or by JavaScript variable.
   * </p>
   * <ul>
   * <li><strong>title</strong>=<em>My Special Window</em>:
   * Finds the window using the text that appears in the title bar.  Be careful;
   * two windows can share the same title.  If that happens, this locator will
   * just pick one.
   * </li>
   * <li><strong>name</strong>=<em>myWindow</em>:
   * Finds the window using its internal JavaScript "name" property.  This is the second 
   * parameter "windowName" passed to the JavaScript method window.open(url, windowName, windowFeatures, replaceFlag)
   * (which Selenium intercepts).
   * </li>
   * <li><strong>var</strong>=<em>variableName</em>:
   * Some pop-up windows are unnamed (anonymous), but are associated with a JavaScript variable name in the current
   * application window, e.g. "window.foo = window.open(url);".  In those cases, you can open the window using
   * "var=foo".
   * </li>
   * </ul>
   * <p>
   * If no window locator prefix is provided, we'll try to guess what you mean like this:</p>
   * <p>1.) if windowID is null, (or the string "null") then it is assumed the user is referring to the original window instantiated by the browser).</p>
   * <p>2.) if the value of the "windowID" parameter is a JavaScript variable name in the current application window, then it is assumed
   * that this variable contains the return value from a call to the JavaScript window.open() method.</p>
   * <p>3.) Otherwise, selenium looks in a hash it maintains that maps string names to window "names".</p>
   * <p>4.) If <em>that</em> fails, we'll try looping over all of the known windows to try to find the appropriate "title".
   * Since "title" is not necessarily unique, this may have unexpected behavior.</p>
   * 
   * <p>If you're having trouble figuring out the name of a window that you want to manipulate, look at the Selenium log messages
   * which identify the names of windows created via window.open (and therefore intercepted by Selenium).  You will see messages
   * like the following for each window as it is opened:</p>
   * 
   * <p><code>debug: window.open call intercepted; window ID (which you can use with selectWindow()) is "myNewWindow"</code></p>
   *
   * <p>In some cases, Selenium will be unable to intercept a call to window.open (if the call occurs during or before the "onLoad" event, for example).
   * (This is bug SEL-339.)  In those cases, you can force Selenium to notice the open window's name by using the Selenium openWindow command, using
   * an empty (blank) url, like this: openWindow("", "myFunnyWindow").</p>
   * 
   * @param windowID the JavaScript window ID of the window to select
   */
    this.browserbot.selectWindow(windowID);
};

Selenium.prototype.doSelectPopUp = function(windowID) {
    /**
    * Simplifies the process of selecting a popup window (and does not offer
    * functionality beyond what <code>selectWindow()</code> already provides).
    * <ul>
    * <li>If <code>windowID</code> is either not specified, or specified as
    * "null", the first non-top window is selected. The top window is the one
    * that would be selected by <code>selectWindow()</code> without providing a
    * <code>windowID</code> . This should not be used when more than one popup
    * window is in play.</li>
    * <li>Otherwise, the window will be looked up considering
    * <code>windowID</code> as the following in order: 1) the "name" of the
    * window, as specified to <code>window.open()</code>; 2) a javascript
    * variable which is a reference to a window; and 3) the title of the
    * window. This is the same ordered lookup performed by
    * <code>selectWindow</code> .</li>
    * </ul>
    *
    * @param windowID  an identifier for the popup window, which can take on a
    *                  number of different meanings
    */
    this.browserbot.selectPopUp(windowID);
};

Selenium.prototype.doDeselectPopUp = function() {
    /**
    * Selects the main window. Functionally equivalent to using
    * <code>selectWindow()</code> and specifying no value for
    * <code>windowID</code>.
    */
    this.browserbot.selectWindow();
}

Selenium.prototype.doSelectFrame = function(locator) {
    /**
    * Selects a frame within the current window.  (You may invoke this command
    * multiple times to select nested frames.)  To select the parent frame, use
    * "relative=parent" as a locator; to select the top frame, use "relative=top".
    * You can also select a frame by its 0-based index number; select the first frame with
    * "index=0", or the third frame with "index=2".
    *
    * <p>You may also use a DOM expression to identify the frame you want directly,
    * like this: <code>dom=frames["main"].frames["subframe"]</code></p>
    *
    * @param locator an <a href="#locators">element locator</a> identifying a frame or iframe
    */
        this.browserbot.selectFrame(locator);
};

Selenium.prototype.getWhetherThisFrameMatchFrameExpression = function(currentFrameString, target) {
    /**
     * Determine whether current/locator identify the frame containing this running code.
     *
     * <p>This is useful in proxy injection mode, where this code runs in every
     * browser frame and window, and sometimes the selenium server needs to identify
     * the "current" frame.  In this case, when the test calls selectFrame, this
     * routine is called for each frame to figure out which one has been selected.
     * The selected frame will return true, while all others will return false.</p>
     *
     * @param currentFrameString starting frame
     * @param target new frame (which might be relative to the current one)
     * @return boolean true if the new frame is this code's window
     */
    return this.browserbot.doesThisFrameMatchFrameExpression(currentFrameString, target);
};

Selenium.prototype.getWhetherThisWindowMatchWindowExpression = function(currentWindowString, target) {
    /**
    * Determine whether currentWindowString plus target identify the window containing this running code.
     *
     * <p>This is useful in proxy injection mode, where this code runs in every
     * browser frame and window, and sometimes the selenium server needs to identify
     * the "current" window.  In this case, when the test calls selectWindow, this
     * routine is called for each window to figure out which one has been selected.
     * The selected window will return true, while all others will return false.</p>
     *
     * @param currentWindowString starting window
     * @param target new window (which might be relative to the current one, e.g., "_parent")
     * @return boolean true if the new window is this code's window
     */
     if (window.opener!=null && window.opener[target]!=null && window.opener[target]==window) {
         return true;
     }
     return false;
};

Selenium.prototype.doWaitForPopUp = function(windowID, timeout) {
    /**
    * Waits for a popup window to appear and load up.
    *
    * @param windowID the JavaScript window "name" of the window that will appear (not the text of the title bar)
    *                 If unspecified, or specified as "null", this command will
    *                 wait for the first non-top window to appear (don't rely
    *                 on this if you are working with multiple popups
    *                 simultaneously). 
    * @param timeout a timeout in milliseconds, after which the action will return with an error.
    *                If this value is not specified, the default Selenium
    *                timeout will be used. See the setTimeout() command.
    */
    if (! timeout) {
        var timeout = this.defaultTimeout;
    }
    var timeoutTime = getTimeoutTime(timeout);
    
    var popupLoadedPredicate = function () {
        var targetWindow;
        try {
            if (windowID && windowID != 'null') {
                targetWindow = selenium.browserbot.getWindowByName(windowID, true);
            }
            else {
                var names = selenium.browserbot.getNonTopWindowNames();
                targetWindow = selenium.browserbot.getWindowByName(names[0], true);
            }
        }
        catch (e) {
            if (new Date().getTime() > timeoutTime) {
                throw e;
            }
        }
        
        if (!targetWindow) return false;
        if (!targetWindow.location) return false;
        if ("about:blank" == targetWindow.location) return false;
        if (browserVersion.isKonqueror) {
            if ("/" == targetWindow.location.href) {
                // apparently Konqueror uses this as the temporary location, instead of about:blank
                return false;
            }
        }
        if (browserVersion.isSafari) {
            if(targetWindow.location.href == selenium.browserbot.buttonWindow.location.href) {
                // Apparently Safari uses this as the temporary location, instead of about:blank
                // what a world!
                LOG.debug("DGF what a world!");
                return false;
            }
        }
        if (!targetWindow.document) return false;
        if (!selenium.browserbot.getCurrentWindow().document.readyState) {
            // This is Firefox, with no readyState extension
            return true;
        }
        if ('complete' != targetWindow.document.readyState) return false;
        return true;
    };

    return Selenium.decorateFunctionWithTimeout(popupLoadedPredicate, timeout);
}

Selenium.prototype.doWaitForPopUp.dontCheckAlertsAndConfirms = true;

Selenium.prototype.doChooseCancelOnNextConfirmation = function() {
    /**
   * <p>
   * By default, Selenium's overridden window.confirm() function will
   * return true, as if the user had manually clicked OK; after running
   * this command, the next call to confirm() will return false, as if
   * the user had clicked Cancel.  Selenium will then resume using the
   * default behavior for future confirmations, automatically returning 
   * true (OK) unless/until you explicitly call this command for each
   * confirmation.
   * </p>
   * <p>
   * Take note - every time a confirmation comes up, you must
   * consume it with a corresponding getConfirmation, or else
   * the next selenium operation will fail.
   * </p>
   */
    this.browserbot.cancelNextConfirmation(false);
};

Selenium.prototype.doChooseOkOnNextConfirmation = function() {
    /**
   * <p>
   * Undo the effect of calling chooseCancelOnNextConfirmation.  Note
   * that Selenium's overridden window.confirm() function will normally automatically
   * return true, as if the user had manually clicked OK, so you shouldn't
   * need to use this command unless for some reason you need to change
   * your mind prior to the next confirmation.  After any confirmation, Selenium will resume using the
   * default behavior for future confirmations, automatically returning 
   * true (OK) unless/until you explicitly call chooseCancelOnNextConfirmation for each
   * confirmation.
   * </p>
   * <p>
   * Take note - every time a confirmation comes up, you must
   * consume it with a corresponding getConfirmation, or else
   * the next selenium operation will fail.
   * </p>
   *
   */
    this.browserbot.cancelNextConfirmation(true);
};

Selenium.prototype.doAnswerOnNextPrompt = function(answer) {
    /**
   * Instructs Selenium to return the specified answer string in response to
   * the next JavaScript prompt [window.prompt()].
   *
   *
   * @param answer the answer to give in response to the prompt pop-up
   */
    this.browserbot.setNextPromptResult(answer);
};

Selenium.prototype.doGoBack = function() {
    /**
     * Simulates the user clicking the "back" button on their browser.
     *
     */
    this.browserbot.goBack();
};

Selenium.prototype.doRefresh = function() {
    /**
     * Simulates the user clicking the "Refresh" button on their browser.
     *
     */
    this.browserbot.refresh();
};

Selenium.prototype.doClose = function() {
    /**
     * Simulates the user clicking the "close" button in the titlebar of a popup
     * window or tab.
     */
    this.browserbot.close();
};

Selenium.prototype.ensureNoUnhandledPopups = function() {
    if (this.browserbot.hasAlerts()) {
        throw new SeleniumError("There was an unexpected Alert! [" + this.browserbot.getNextAlert() + "]");
    }
    if ( this.browserbot.hasConfirmations() ) {
        throw new SeleniumError("There was an unexpected Confirmation! [" + this.browserbot.getNextConfirmation() + "]");
    }
};

Selenium.prototype.isAlertPresent = function() {
   /**
   * Has an alert occurred?
   *
   * <p>
   * This function never throws an exception
   * </p>
   * @return boolean true if there is an alert
   */
    return this.browserbot.hasAlerts();
};

Selenium.prototype.isPromptPresent = function() {
   /**
   * Has a prompt occurred?
   *
   * <p>
   * This function never throws an exception
   * </p>
   * @return boolean true if there is a pending prompt
   */
    return this.browserbot.hasPrompts();
};

Selenium.prototype.isConfirmationPresent = function() {
   /**
   * Has confirm() been called?
   *
   * <p>
   * This function never throws an exception
   * </p>
   * @return boolean true if there is a pending confirmation
   */
    return this.browserbot.hasConfirmations();
};
Selenium.prototype.getAlert = function() {
    /**
   * Retrieves the message of a JavaScript alert generated during the previous action, or fail if there were no alerts.
   *
   * <p>Getting an alert has the same effect as manually clicking OK. If an
   * alert is generated but you do not consume it with getAlert, the next Selenium action
   * will fail.</p>
   *
   * <p>Under Selenium, JavaScript alerts will NOT pop up a visible alert
   * dialog.</p>
   *
   * <p>Selenium does NOT support JavaScript alerts that are generated in a
   * page's onload() event handler. In this case a visible dialog WILL be
   * generated and Selenium will hang until someone manually clicks OK.</p>
   * @return string The message of the most recent JavaScript alert

   */
    if (!this.browserbot.hasAlerts()) {
        Assert.fail("There were no alerts");
    }
    return this.browserbot.getNextAlert();
};
Selenium.prototype.getAlert.dontCheckAlertsAndConfirms = true;

Selenium.prototype.getConfirmation = function() {
    /**
   * Retrieves the message of a JavaScript confirmation dialog generated during
   * the previous action.
   *
   * <p>
   * By default, the confirm function will return true, having the same effect
   * as manually clicking OK. This can be changed by prior execution of the
   * chooseCancelOnNextConfirmation command. 
   * </p>
   * <p>
   * If an confirmation is generated but you do not consume it with getConfirmation,
   * the next Selenium action will fail.
   * </p>
   *
   * <p>
   * NOTE: under Selenium, JavaScript confirmations will NOT pop up a visible
   * dialog.
   * </p>
   *
   * <p>
   * NOTE: Selenium does NOT support JavaScript confirmations that are
   * generated in a page's onload() event handler. In this case a visible
   * dialog WILL be generated and Selenium will hang until you manually click
   * OK.
   * </p>
   *
   * @return string the message of the most recent JavaScript confirmation dialog
   */
    if (!this.browserbot.hasConfirmations()) {
        Assert.fail("There were no confirmations");
    }
    return this.browserbot.getNextConfirmation();
};
Selenium.prototype.getConfirmation.dontCheckAlertsAndConfirms = true;

Selenium.prototype.getPrompt = function() {
    /**
   * Retrieves the message of a JavaScript question prompt dialog generated during
   * the previous action.
   *
   * <p>Successful handling of the prompt requires prior execution of the
   * answerOnNextPrompt command. If a prompt is generated but you
   * do not get/verify it, the next Selenium action will fail.</p>
   *
   * <p>NOTE: under Selenium, JavaScript prompts will NOT pop up a visible
   * dialog.</p>
   *
   * <p>NOTE: Selenium does NOT support JavaScript prompts that are generated in a
   * page's onload() event handler. In this case a visible dialog WILL be
   * generated and Selenium will hang until someone manually clicks OK.</p>
   * @return string the message of the most recent JavaScript question prompt
   */
    if (! this.browserbot.hasPrompts()) {
        Assert.fail("There were no prompts");
    }
    return this.browserbot.getNextPrompt();
};

Selenium.prototype.getLocation = function() {
    /** Gets the absolute URL of the current page.
   *
   * @return string the absolute URL of the current page
   */
    return this.browserbot.getCurrentWindow().location.href;
};

Selenium.prototype.getTitle = function() {
    /** Gets the title of the current page.
   *
   * @return string the title of the current page
   */
    return this.browserbot.getTitle();
};


Selenium.prototype.getBodyText = function() {
    /**
     * Gets the entire text of the page.
     * @return string the entire text of the page
     */
    return this.browserbot.bodyText();
};


Selenium.prototype.getValue = function(locator) {
  /**
   * Gets the (whitespace-trimmed) value of an input field (or anything else with a value parameter).
   * For checkbox/radio elements, the value will be "on" or "off" depending on
   * whether the element is checked or not.
   *
   * @param locator an <a href="#locators">element locator</a>
   * @return string the element value, or "on/off" for checkbox/radio elements
   */
    var element = this.browserbot.findElement(locator)
    return getInputValue(element).trim();
}

Selenium.prototype.getText = function(locator) {
    /**
   * Gets the text of an element. This works for any element that contains
   * text. This command uses either the textContent (Mozilla-like browsers) or
   * the innerText (IE-like browsers) of the element, which is the rendered
   * text shown to the user.
   *
   * @param locator an <a href="#locators">element locator</a>
   * @return string the text of the element
   */
    var element = this.browserbot.findElement(locator);
    return getText(element).trim();
};

Selenium.prototype.doHighlight = function(locator) {
    /**
    * Briefly changes the backgroundColor of the specified element yellow.  Useful for debugging.
    * 
    * @param locator an <a href="#locators">element locator</a>
    */
    var element = this.browserbot.findElement(locator);
    this.browserbot.highlight(element, true);
};

Selenium.prototype.getEval = function(script) {
    /** Gets the result of evaluating the specified JavaScript snippet.  The snippet may
   * have multiple lines, but only the result of the last line will be returned.
   *
   * <p>Note that, by default, the snippet will run in the context of the "selenium"
   * object itself, so <code>this</code> will refer to the Selenium object.  Use <code>window</code> to
   * refer to the window of your application, e.g. <code>window.document.getElementById('foo')</code></p>
   *
   * <p>If you need to use
   * a locator to refer to a single element in your application page, you can
   * use <code>this.browserbot.findElement("id=foo")</code> where "id=foo" is your locator.</p>
   *
   * @param script the JavaScript snippet to run
   * @return string the results of evaluating the snippet
   */
    try {
        var window = this.browserbot.getCurrentWindow();
        var result = eval(script);
        // Selenium RC doesn't allow returning null
        if (null == result) return "null";
        return result;
    } catch (e) {
        throw new SeleniumError("Threw an exception: " + extractExceptionMessage(e));
    }
};

Selenium.prototype.isChecked = function(locator) {
    /**
   * Gets whether a toggle-button (checkbox/radio) is checked.  Fails if the specified element doesn't exist or isn't a toggle-button.
   * @param locator an <a href="#locators">element locator</a> pointing to a checkbox or radio button
   * @return boolean true if the checkbox is checked, false otherwise
   */
    var element = this.browserbot.findElement(locator);
    if (element.checked == null) {
        throw new SeleniumError("Element " + locator + " is not a toggle-button.");
    }
    return element.checked;
};

Selenium.prototype.getTable = function(tableCellAddress) {
    /**
   * Gets the text from a cell of a table. The cellAddress syntax
   * tableLocator.row.column, where row and column start at 0.
   *
   * @param tableCellAddress a cell address, e.g. "foo.1.4"
   * @return string the text from the specified cell
   */
    // This regular expression matches "tableName.row.column"
    // For example, "mytable.3.4"
    pattern = /(.*)\.(\d+)\.(\d+)/;

    if(!pattern.test(tableCellAddress)) {
        throw new SeleniumError("Invalid target format. Correct format is tableName.rowNum.columnNum");
    }

    pieces = tableCellAddress.match(pattern);

    tableName = pieces[1];
    row = pieces[2];
    col = pieces[3];

    var table = this.browserbot.findElement(tableName);
    if (row > table.rows.length) {
        Assert.fail("Cannot access row " + row + " - table has " + table.rows.length + " rows");
    }
    else if (col > table.rows[row].cells.length) {
        Assert.fail("Cannot access column " + col + " - table row has " + table.rows[row].cells.length + " columns");
    }
    else {
        actualContent = getText(table.rows[row].cells[col]);
        return actualContent.trim();
    }
    return null;
};

Selenium.prototype.getSelectedLabels = function(selectLocator) {
    /** Gets all option labels (visible text) for selected options in the specified select or multi-select element.
   *
   * @param selectLocator an <a href="#locators">element locator</a> identifying a drop-down menu
   * @return string[] an array of all selected option labels in the specified select drop-down
   */
    return this.findSelectedOptionProperties(selectLocator, "text");
}

Selenium.prototype.getSelectedLabel = function(selectLocator) {
    /** Gets option label (visible text) for selected option in the specified select element.
   *
   * @param selectLocator an <a href="#locators">element locator</a> identifying a drop-down menu
   * @return string the selected option label in the specified select drop-down
   */
    return this.findSelectedOptionProperty(selectLocator, "text");
}

Selenium.prototype.getSelectedValues = function(selectLocator) {
    /** Gets all option values (value attributes) for selected options in the specified select or multi-select element.
   *
   * @param selectLocator an <a href="#locators">element locator</a> identifying a drop-down menu
   * @return string[] an array of all selected option values in the specified select drop-down
   */
    return this.findSelectedOptionProperties(selectLocator, "value");
}

Selenium.prototype.getSelectedValue = function(selectLocator) {
    /** Gets option value (value attribute) for selected option in the specified select element.
   *
   * @param selectLocator an <a href="#locators">element locator</a> identifying a drop-down menu
   * @return string the selected option value in the specified select drop-down
   */
    return this.findSelectedOptionProperty(selectLocator, "value");
}

Selenium.prototype.getSelectedIndexes = function(selectLocator) {
    /** Gets all option indexes (option number, starting at 0) for selected options in the specified select or multi-select element.
   *
   * @param selectLocator an <a href="#locators">element locator</a> identifying a drop-down menu
   * @return string[] an array of all selected option indexes in the specified select drop-down
   */
    return this.findSelectedOptionProperties(selectLocator, "index");
}

Selenium.prototype.getSelectedIndex = function(selectLocator) {
    /** Gets option index (option number, starting at 0) for selected option in the specified select element.
   *
   * @param selectLocator an <a href="#locators">element locator</a> identifying a drop-down menu
   * @return string the selected option index in the specified select drop-down
   */
    return this.findSelectedOptionProperty(selectLocator, "index");
}

Selenium.prototype.getSelectedIds = function(selectLocator) {
    /** Gets all option element IDs for selected options in the specified select or multi-select element.
   *
   * @param selectLocator an <a href="#locators">element locator</a> identifying a drop-down menu
   * @return string[] an array of all selected option IDs in the specified select drop-down
   */
    return this.findSelectedOptionProperties(selectLocator, "id");
}

Selenium.prototype.getSelectedId = function(selectLocator) {
    /** Gets option element ID for selected option in the specified select element.
   *
   * @param selectLocator an <a href="#locators">element locator</a> identifying a drop-down menu
   * @return string the selected option ID in the specified select drop-down
   */
    return this.findSelectedOptionProperty(selectLocator, "id");
}

Selenium.prototype.isSomethingSelected = function(selectLocator) {
    /** Determines whether some option in a drop-down menu is selected.
   *
   * @param selectLocator an <a href="#locators">element locator</a> identifying a drop-down menu
   * @return boolean true if some option has been selected, false otherwise
   */
    var element = this.browserbot.findElement(selectLocator);
    if (!("options" in element)) {
        throw new SeleniumError("Specified element is not a Select (has no options)");
    }

    var selectedOptions = [];

    for (var i = 0; i < element.options.length; i++) {
        if (element.options[i].selected)
        {
            return true;
        }
    }
    return false;
}

Selenium.prototype.findSelectedOptionProperties = function(locator, property) {
   var element = this.browserbot.findElement(locator);
   if (!("options" in element)) {
        throw new SeleniumError("Specified element is not a Select (has no options)");
    }

    var selectedOptions = [];

    for (var i = 0; i < element.options.length; i++) {
        if (element.options[i].selected)
        {
            var propVal = element.options[i][property];
            selectedOptions.push(propVal);
        }
    }
    if (selectedOptions.length == 0) Assert.fail("No option selected");
    return selectedOptions;
}

Selenium.prototype.findSelectedOptionProperty = function(locator, property) {
    var selectedOptions = this.findSelectedOptionProperties(locator, property);
    if (selectedOptions.length > 1) {
        Assert.fail("More than one selected option!");
    }
    return selectedOptions[0];
}

Selenium.prototype.getSelectOptions = function(selectLocator) {
    /** Gets all option labels in the specified select drop-down.
   *
   * @param selectLocator an <a href="#locators">element locator</a> identifying a drop-down menu
   * @return string[] an array of all option labels in the specified select drop-down
   */
    var element = this.browserbot.findElement(selectLocator);

    var selectOptions = [];

    for (var i = 0; i < element.options.length; i++) {
        var option = element.options[i].text;
        selectOptions.push(option);
    }

    return selectOptions;
};


Selenium.prototype.getAttribute = function(attributeLocator) {
    /**
   * Gets the value of an element attribute. The value of the attribute may
   * differ across browsers (this is the case for the "style" attribute, for
   * example).
   *
   * @param attributeLocator an element locator followed by an &#064; sign and then the name of the attribute, e.g. "foo&#064;bar"
   * @return string the value of the specified attribute
   */
   var result = this.browserbot.findAttribute(attributeLocator);
   if (result == null) {
           throw new SeleniumError("Could not find element attribute: " + attributeLocator);
    }
    return result;
};

Selenium.prototype.isTextPresent = function(pattern) {
    /**
   * Verifies that the specified text pattern appears somewhere on the rendered page shown to the user.
   * @param pattern a <a href="#patterns">pattern</a> to match with the text of the page
   * @return boolean true if the pattern matches the text, false otherwise
   */
    var allText = this.browserbot.bodyText();

    var patternMatcher = new PatternMatcher(pattern);
    if (patternMatcher.strategy == PatternMatcher.strategies.glob) {
            if (pattern.indexOf("glob:")==0) {
                    pattern = pattern.substring("glob:".length); // strip off "glob:"
                }
        patternMatcher.matcher = new PatternMatcher.strategies.globContains(pattern);
    }
    else if (patternMatcher.strategy == PatternMatcher.strategies.exact) {
                pattern = pattern.substring("exact:".length); // strip off "exact:"
        return allText.indexOf(pattern) != -1;
    }
    return patternMatcher.matches(allText);
};

Selenium.prototype.isElementPresent = function(locator) {
    /**
    * Verifies that the specified element is somewhere on the page.
    * @param locator an <a href="#locators">element locator</a>
    * @return boolean true if the element is present, false otherwise
    */
    var element = this.browserbot.findElementOrNull(locator);
    if (element == null) {
        return false;
    }
    return true;
};

Selenium.prototype.isVisible = function(locator) {
    /**
   * Determines if the specified element is visible. An
   * element can be rendered invisible by setting the CSS "visibility"
   * property to "hidden", or the "display" property to "none", either for the
   * element itself or one if its ancestors.  This method will fail if
   * the element is not present.
   *
   * @param locator an <a href="#locators">element locator</a>
   * @return boolean true if the specified element is visible, false otherwise
   */
    var element;
    element = this.browserbot.findElement(locator);
    // DGF if it's an input tag of type "hidden" then it's not visible
    if (element.tagName) {
        var tagName = new String(element.tagName).toLowerCase();
        if (tagName == "input") {
            if (element.type) {
                var elementType = new String(element.type).toLowerCase();
                if (elementType == "hidden") {
                    return false;
                }
            }
        }
    }
    var visibility = this.findEffectiveStyleProperty(element, "visibility");
    var _isDisplayed = this._isDisplayed(element);
    return (visibility != "hidden" && _isDisplayed);
};

Selenium.prototype.findEffectiveStyleProperty = function(element, property) {
    var effectiveStyle = this.findEffectiveStyle(element);
    var propertyValue = effectiveStyle[property];
    if (propertyValue == 'inherit' && element.parentNode.style) {
        return this.findEffectiveStyleProperty(element.parentNode, property);
    }
    return propertyValue;
};

Selenium.prototype._isDisplayed = function(element) {
    var display = this.findEffectiveStyleProperty(element, "display");
    if (display == "none") return false;
    if (element.parentNode.style) {
        return this._isDisplayed(element.parentNode);
    }
    return true;
};

Selenium.prototype.findEffectiveStyle = function(element) {
    if (element.style == undefined) {
        return undefined; // not a styled element
    }
    var window = this.browserbot.getCurrentWindow();
    if (window.getComputedStyle) {
        // DOM-Level-2-CSS
        return window.getComputedStyle(element, null);
    }
    if (element.currentStyle) {
        // non-standard IE alternative
        return element.currentStyle;
        // TODO: this won't really work in a general sense, as
        //   currentStyle is not identical to getComputedStyle()
        //   ... but it's good enough for "visibility"
    }

    if (window.document.defaultView && window.document.defaultView.getComputedStyle) {
        return window.document.defaultView.getComputedStyle(element, null);
    }


    throw new SeleniumError("cannot determine effective stylesheet in this browser");
};

Selenium.prototype.isEditable = function(locator) {
    /**
   * Determines whether the specified input element is editable, ie hasn't been disabled.
   * This method will fail if the specified element isn't an input element.
   *
   * @param locator an <a href="#locators">element locator</a>
   * @return boolean true if the input element is editable, false otherwise
   */
    var element = this.browserbot.findElement(locator);
    if (element.value == undefined) {
        Assert.fail("Element " + locator + " is not an input.");
    }
    if (element.disabled) {
        return false;
    }
    // DGF "readonly" is a bit goofy... it doesn't necessarily have a value
    // You can write <input readonly value="black">
    var readOnlyNode = element.getAttributeNode('readonly');
    if (readOnlyNode) {
        // DGF on IE, every input element has a readOnly node, but it may be false
        if (typeof(readOnlyNode.nodeValue) == "boolean") {
            var readOnly = readOnlyNode.nodeValue;
            if (readOnly) {
                return false;
            }
        } else {
            return false;
        }
    }
    return true;
};

Selenium.prototype.getAllButtons = function() {
    /** Returns the IDs of all buttons on the page.
   *
   * <p>If a given button has no ID, it will appear as "" in this array.</p>
   *
   * @return string[] the IDs of all buttons on the page
   */
   return this.browserbot.getAllButtons();
};

Selenium.prototype.getAllLinks = function() {
    /** Returns the IDs of all links on the page.
   *
   * <p>If a given link has no ID, it will appear as "" in this array.</p>
   *
   * @return string[] the IDs of all links on the page
   */
   return this.browserbot.getAllLinks();
};

Selenium.prototype.getAllFields = function() {
    /** Returns the IDs of all input fields on the page.
   *
   * <p>If a given field has no ID, it will appear as "" in this array.</p>
   *
   * @return string[] the IDs of all field on the page
   */
   return this.browserbot.getAllFields();
};

Selenium.prototype.getAttributeFromAllWindows = function(attributeName) {
    /** Returns an array of JavaScript property values from all known windows having one.
    *
    * @param attributeName name of an attribute on the windows
    * @return string[] the set of values of this attribute from all known windows.
    */
    var attributes = new Array();
    
    var win = selenium.browserbot.topWindow;
    
    // DGF normally you should use []s instead of eval "win."+attributeName
    // but in this case, attributeName may contain dots (e.g. document.title)
    // in that case, we have no choice but to use eval...
    attributes.push(eval("win."+attributeName));
    for (var windowName in this.browserbot.openedWindows)
    {
        try {
            win = selenium.browserbot.openedWindows[windowName];
            attributes.push(eval("win."+attributeName));
        } catch (e) {} // DGF If we miss one... meh. It's probably closed or inaccessible anyway.
    }
    return attributes;
};

Selenium.prototype.findWindow = function(soughtAfterWindowPropertyValue) {
   var targetPropertyName = "name";
   if (soughtAfterWindowPropertyValue.match("^title=")) {
       targetPropertyName = "document.title";
        soughtAfterWindowPropertyValue = soughtAfterWindowPropertyValue.replace(/^title=/, "");
   }
   else {
       // matching "name":
       // If we are not in proxy injection mode, then the top-level test window will be named selenium_myiframe.
        // But as far as the interface goes, we are expected to match a blank string to this window, if
        // we are searching with respect to the widow name.
        // So make a special case so that this logic will work:
        if (PatternMatcher.matches(soughtAfterWindowPropertyValue, "")) {
           return this.browserbot.getCurrentWindow();
        }
   }

   // DGF normally you should use []s instead of eval "win."+attributeName
   // but in this case, attributeName may contain dots (e.g. document.title)
   // in that case, we have no choice but to use eval...
   if (PatternMatcher.matches(soughtAfterWindowPropertyValue, eval("this.browserbot.topWindow." + targetPropertyName))) {
       return this.browserbot.topWindow;
   }
   for (windowName in selenium.browserbot.openedWindows) {
       var openedWindow = selenium.browserbot.openedWindows[windowName];
       if (PatternMatcher.matches(soughtAfterWindowPropertyValue, eval("openedWindow." + targetPropertyName))) {
            return openedWindow;
        }
   }
   throw new SeleniumError("could not find window with property " + targetPropertyName + " matching " + soughtAfterWindowPropertyValue);
};

Selenium.prototype.doDragdrop = function(locator, movementsString) {
/** deprecated - use dragAndDrop instead
   *
   * @param locator an element locator
   * @param movementsString offset in pixels from the current location to which the element should be moved, e.g., "+70,-300"
   */
   this.doDragAndDrop(locator, movementsString);
};

Selenium.prototype.doSetMouseSpeed = function(pixels) {
    /** Configure the number of pixels between "mousemove" events during dragAndDrop commands (default=10).
    * <p>Setting this value to 0 means that we'll send a "mousemove" event to every single pixel
    * in between the start location and the end location; that can be very slow, and may
    * cause some browsers to force the JavaScript to timeout.</p>
    * 
    * <p>If the mouse speed is greater than the distance between the two dragged objects, we'll
    * just send one "mousemove" at the start location and then one final one at the end location.</p>
    * @param pixels the number of pixels between "mousemove" events
    */
    var intValue = new Number(pixels);
    if (intValue.constructor != Number ||
    		intValue < 0 ) {
    	this.mouseSpeed = Selenium.DEFAULT_MOUSE_SPEED;
    } else {
    	this.mouseSpeed = pixels;
    }
}
 
Selenium.prototype.getMouseSpeed = function() {
    /** Returns the number of pixels between "mousemove" events during dragAndDrop commands (default=10).
    * 
    * @return number the number of pixels between "mousemove" events during dragAndDrop commands (default=10)
    */
    return this.mouseSpeed;
}


Selenium.prototype.doDragAndDrop = function(locator, movementsString) {
    /** Drags an element a certain distance and then drops it
    * @param locator an element locator
    * @param movementsString offset in pixels from the current location to which the element should be moved, e.g., "+70,-300"
    */
    var element = this.browserbot.findElement(locator);
    var clientStartXY = getClientXY(element)
    var clientStartX = clientStartXY[0];
    var clientStartY = clientStartXY[1];
    
    var movements = movementsString.split(/,/);
    var movementX = Number(movements[0]);
    var movementY = Number(movements[1]);
    
    var clientFinishX = ((clientStartX + movementX) < 0) ? 0 : (clientStartX + movementX);
    var clientFinishY = ((clientStartY + movementY) < 0) ? 0 : (clientStartY + movementY);
    
    var mouseSpeed = this.mouseSpeed;
    var move = function(current, dest) {
        if (current == dest) return current;
        if (Math.abs(current - dest) < mouseSpeed) return dest;
        return (current < dest) ? current + mouseSpeed : current - mouseSpeed;
    }
    
    this.browserbot.triggerMouseEvent(element, 'mousedown', true, clientStartX, clientStartY);
    this.browserbot.triggerMouseEvent(element, 'mousemove',   true, clientStartX, clientStartY);
    var clientX = clientStartX;
    var clientY = clientStartY;
    
    while ((clientX != clientFinishX) || (clientY != clientFinishY)) {
        clientX = move(clientX, clientFinishX);
        clientY = move(clientY, clientFinishY);
        this.browserbot.triggerMouseEvent(element, 'mousemove', true, clientX, clientY);
    }
    
    this.browserbot.triggerMouseEvent(element, 'mousemove',   true, clientFinishX, clientFinishY);
    this.browserbot.triggerMouseEvent(element, 'mouseup',   true, clientFinishX, clientFinishY);
};

Selenium.prototype.doDragAndDropToObject = function(locatorOfObjectToBeDragged, locatorOfDragDestinationObject) {
/** Drags an element and drops it on another element
   *
   * @param locatorOfObjectToBeDragged an element to be dragged
   * @param locatorOfDragDestinationObject an element whose location (i.e., whose center-most pixel) will be the point where locatorOfObjectToBeDragged  is dropped
   */
   var startX = this.getElementPositionLeft(locatorOfObjectToBeDragged);
   var startY = this.getElementPositionTop(locatorOfObjectToBeDragged);
   
   var destinationLeftX = this.getElementPositionLeft(locatorOfDragDestinationObject);
   var destinationTopY = this.getElementPositionTop(locatorOfDragDestinationObject);
   var destinationWidth = this.getElementWidth(locatorOfDragDestinationObject);
   var destinationHeight = this.getElementHeight(locatorOfDragDestinationObject);

   var endX = Math.round(destinationLeftX + (destinationWidth / 2));
   var endY = Math.round(destinationTopY + (destinationHeight / 2));
   
   var deltaX = endX - startX;
   var deltaY = endY - startY;
   
   var movementsString = "" + deltaX + "," + deltaY;
   
   this.doDragAndDrop(locatorOfObjectToBeDragged, movementsString);
};

Selenium.prototype.doWindowFocus = function() {
/** Gives focus to the currently selected window
   *
   */
   this.browserbot.getCurrentWindow().focus();
};


Selenium.prototype.doWindowMaximize = function() {
/** Resize currently selected window to take up the entire screen
   *
   */
   var window = this.browserbot.getCurrentWindow();
   if (window!=null && window.screen) {
       window.moveTo(0,0);
       window.resizeTo(screen.availWidth, screen.availHeight);
   }
};

Selenium.prototype.getAllWindowIds = function() {
  /** Returns the IDs of all windows that the browser knows about in an array.
   *
   * @return string[] Array of identifiers of all windows that the browser knows about.
   */
   return this.getAttributeFromAllWindows("id");
};

Selenium.prototype.getAllWindowNames = function() {
  /** Returns the names of all windows that the browser knows about in an array.
   *
   * @return string[] Array of names of all windows that the browser knows about.
   */
   return this.getAttributeFromAllWindows("name");
};

Selenium.prototype.getAllWindowTitles = function() {
  /** Returns the titles of all windows that the browser knows about in an array.
   *
   * @return string[] Array of titles of all windows that the browser knows about.
   */
   return this.getAttributeFromAllWindows("document.title");
};

Selenium.prototype.getHtmlSource = function() {
    /** Returns the entire HTML source between the opening and
   * closing "html" tags.
   *
   * @return string the entire HTML source
   */
    return this.browserbot.getDocument().getElementsByTagName("html")[0].innerHTML;
};

Selenium.prototype.doSetCursorPosition = function(locator, position) {
    /**
   * Moves the text cursor to the specified position in the given input element or textarea.
   * This method will fail if the specified element isn't an input element or textarea.
   *
   * @param locator an <a href="#locators">element locator</a> pointing to an input element or textarea
   * @param position the numerical position of the cursor in the field; position should be 0 to move the position to the beginning of the field.  You can also set the cursor to -1 to move it to the end of the field.
   */
   var element = this.browserbot.findElement(locator);
    if (element.value == undefined) {
        Assert.fail("Element " + locator + " is not an input.");
    }
    if (position == -1) {
        position = element.value.length;
    }

   if( element.setSelectionRange && !browserVersion.isOpera) {
       element.focus();
        element.setSelectionRange(/*start*/position,/*end*/position);
   }
   else if( element.createTextRange ) {
      triggerEvent(element, 'focus', false);
      var range = element.createTextRange();
      range.collapse(true);
      range.moveEnd('character',position);
      range.moveStart('character',position);
      range.select();
   }
}

Selenium.prototype.getElementIndex = function(locator) {
    /**
     * Get the relative index of an element to its parent (starting from 0). The comment node and empty text node
     * will be ignored.
     *
     * @param locator an <a href="#locators">element locator</a> pointing to an element
     * @return number of relative index of the element to its parent (starting from 0)
     */
    var element = this.browserbot.findElement(locator);
    var previousSibling;
    var index = 0;
    while ((previousSibling = element.previousSibling) != null) {
        if (!this._isCommentOrEmptyTextNode(previousSibling)) {
            index++;
        }
        element = previousSibling;
    }
    return index;
}

Selenium.prototype.isOrdered = function(locator1, locator2) {
    /**
     * Check if these two elements have same parent and are ordered siblings in the DOM. Two same elements will
     * not be considered ordered.
     *
     * @param locator1 an <a href="#locators">element locator</a> pointing to the first element
     * @param locator2 an <a href="#locators">element locator</a> pointing to the second element
     * @return boolean true if element1 is the previous sibling of element2, false otherwise
     */
    var element1 = this.browserbot.findElement(locator1);
    var element2 = this.browserbot.findElement(locator2);
    if (element1 === element2) return false;

    var previousSibling;
    while ((previousSibling = element2.previousSibling) != null) {
        if (previousSibling === element1) {
            return true;
        }
        element2 = previousSibling;
    }
    return false;
}

Selenium.prototype._isCommentOrEmptyTextNode = function(node) {
    return node.nodeType == 8 || ((node.nodeType == 3) && !(/[^\t\n\r ]/.test(node.data)));
}

Selenium.prototype.getElementPositionLeft = function(locator) {
   /**
   * Retrieves the horizontal position of an element
   *
   * @param locator an <a href="#locators">element locator</a> pointing to an element OR an element itself
   * @return number of pixels from the edge of the frame.
   */
       var element;
        if ("string"==typeof locator) {
            element = this.browserbot.findElement(locator);
        }
        else {
            element = locator;
        }
    var x = element.offsetLeft;
    var elementParent = element.offsetParent;

    while (elementParent != null)
    {
        if(document.all)
        {
            if( (elementParent.tagName != "TABLE") && (elementParent.tagName != "BODY") )
            {
                x += elementParent.clientLeft;
            }
        }
        else // Netscape/DOM
        {
            if(elementParent.tagName == "TABLE")
            {
                var parentBorder = parseInt(elementParent.border);
                if(isNaN(parentBorder))
                {
                    var parentFrame = elementParent.getAttribute('frame');
                    if(parentFrame != null)
                    {
                        x += 1;
                    }
                }
                else if(parentBorder > 0)
                {
                    x += parentBorder;
                }
            }
        }
        x += elementParent.offsetLeft;
        elementParent = elementParent.offsetParent;
    }
    return x;
};

Selenium.prototype.getElementPositionTop = function(locator) {
   /**
   * Retrieves the vertical position of an element
   *
   * @param locator an <a href="#locators">element locator</a> pointing to an element OR an element itself
   * @return number of pixels from the edge of the frame.
   */
       var element;
        if ("string"==typeof locator) {
            element = this.browserbot.findElement(locator);
        }
        else {
            element = locator;
        }

       var y = 0;

       while (element != null)
    {
        if(document.all)
        {
            if( (element.tagName != "TABLE") && (element.tagName != "BODY") )
            {
            y += element.clientTop;
            }
        }
        else // Netscape/DOM
        {
            if(element.tagName == "TABLE")
            {
            var parentBorder = parseInt(element.border);
            if(isNaN(parentBorder))
            {
                var parentFrame = element.getAttribute('frame');
                if(parentFrame != null)
                {
                    y += 1;
                }
            }
            else if(parentBorder > 0)
            {
                y += parentBorder;
            }
            }
        }
        y += element.offsetTop;

            // Netscape can get confused in some cases, such that the height of the parent is smaller
            // than that of the element (which it shouldn't really be). If this is the case, we need to
            // exclude this element, since it will result in too large a 'top' return value.
            if (element.offsetParent && element.offsetParent.offsetHeight && element.offsetParent.offsetHeight < element.offsetHeight)
            {
                // skip the parent that's too small
                element = element.offsetParent.offsetParent;
            }
            else
            {
            // Next up...
            element = element.offsetParent;
        }
       }
    return y;
};

Selenium.prototype.getElementWidth = function(locator) {
   /**
   * Retrieves the width of an element
   *
   * @param locator an <a href="#locators">element locator</a> pointing to an element
   * @return number width of an element in pixels
   */
   var element = this.browserbot.findElement(locator);
   return element.offsetWidth;
};

Selenium.prototype.getElementHeight = function(locator) {
   /**
   * Retrieves the height of an element
   *
   * @param locator an <a href="#locators">element locator</a> pointing to an element
   * @return number height of an element in pixels
   */
   var element = this.browserbot.findElement(locator);
   return element.offsetHeight;
};

Selenium.prototype.getCursorPosition = function(locator) {
    /**
   * Retrieves the text cursor position in the given input element or textarea; beware, this may not work perfectly on all browsers.
   *
   * <p>Specifically, if the cursor/selection has been cleared by JavaScript, this command will tend to
   * return the position of the last location of the cursor, even though the cursor is now gone from the page.  This is filed as <a href="http://jira.openqa.org/browse/SEL-243">SEL-243</a>.</p>
   * This method will fail if the specified element isn't an input element or textarea, or there is no cursor in the element.
   *
   * @param locator an <a href="#locators">element locator</a> pointing to an input element or textarea
   * @return number the numerical position of the cursor in the field
   */
    var element = this.browserbot.findElement(locator);
    var doc = this.browserbot.getDocument();
    var win = this.browserbot.getCurrentWindow();
    if( doc.selection && !browserVersion.isOpera){
        try {
            var selectRange = doc.selection.createRange().duplicate();
            var elementRange = element.createTextRange();
            selectRange.move("character",0);
            elementRange.move("character",0);
            var inRange1 = selectRange.inRange(elementRange);
            var inRange2 = elementRange.inRange(selectRange);
            elementRange.setEndPoint("EndToEnd", selectRange);
        } catch (e) {
            Assert.fail("There is no cursor on this page!");
        }
        var answer = String(elementRange.text).replace(/\r/g,"").length;
        return answer;
    } else {
        if (typeof(element.selectionStart) != "undefined") {
            if (win.getSelection && typeof(win.getSelection().rangeCount) != undefined && win.getSelection().rangeCount == 0) {
                Assert.fail("There is no cursor on this page!");
            }
            return element.selectionStart;
        }
    }
    throw new Error("Couldn't detect cursor position on this browser!");
}


Selenium.prototype.getExpression = function(expression) {
    /**
     * Returns the specified expression.
     *
     * <p>This is useful because of JavaScript preprocessing.
     * It is used to generate commands like assertExpression and waitForExpression.</p>
     *
     * @param expression the value to return
     * @return string the value passed in
     */
    return expression;
}

Selenium.prototype.getXpathCount = function(xpath) {
    /**
    * Returns the number of nodes that match the specified xpath, eg. "//table" would give
    * the number of tables.
    * 
    * @param xpath the xpath expression to evaluate. do NOT wrap this expression in a 'count()' function; we will do that for you.
    * @return number the number of nodes that match the specified xpath
    */
    var result = this.browserbot.evaluateXPathCount(xpath, this.browserbot.getDocument());
    return result;
}

Selenium.prototype.doAssignId = function(locator, identifier) {
    /**
    * Temporarily sets the "id" attribute of the specified element, so you can locate it in the future
    * using its ID rather than a slow/complicated XPath.  This ID will disappear once the page is
    * reloaded.
    * @param locator an <a href="#locators">element locator</a> pointing to an element
    * @param identifier a string to be used as the ID of the specified element
    */
    var element = this.browserbot.findElement(locator);
    element.id = identifier;
}

Selenium.prototype.doAllowNativeXpath = function(allow) {
    /**
    * Specifies whether Selenium should use the native in-browser implementation
    * of XPath (if any native version is available); if you pass "false" to
    * this function, we will always use our pure-JavaScript xpath library.
    * Using the pure-JS xpath library can improve the consistency of xpath
    * element locators between different browser vendors, but the pure-JS
    * version is much slower than the native implementations.
    * @param allow boolean, true means we'll prefer to use native XPath; false means we'll only use JS XPath
    */
    if ("false" == allow || "0" == allow) { // The strings "false" and "0" are true values in JS
        allow = false;
    }
    this.browserbot.allowNativeXpath = allow;
}

Selenium.prototype.doIgnoreAttributesWithoutValue = function(ignore) {
    /**
    * Specifies whether Selenium will ignore xpath attributes that have no
    * value, i.e. are the empty string, when using the non-native xpath
    * evaluation engine. You'd want to do this for performance reasons in IE.
    * However, this could break certain xpaths, for example an xpath that looks
    * for an attribute whose value is NOT the empty string.
    *
    * The hope is that such xpaths are relatively rare, but the user should
    * have the option of using them. Note that this only influences xpath
    * evaluation when using the ajaxslt engine (i.e. not "javascript-xpath").
    *
    * @param ignore boolean, true means we'll ignore attributes without value
    *                        at the expense of xpath "correctness"; false means
    *                        we'll sacrifice speed for correctness.
    */
    if ('false' == ignore || '0' == ignore) {
        ignore = false;
    }
    this.browserbot.ignoreAttributesWithoutValue = ignore;
}

Selenium.prototype.doWaitForCondition = function(script, timeout) {
    /**
   * Runs the specified JavaScript snippet repeatedly until it evaluates to "true".
   * The snippet may have multiple lines, but only the result of the last line
   * will be considered.
   *
   * <p>Note that, by default, the snippet will be run in the runner's test window, not in the window
   * of your application.  To get the window of your application, you can use
   * the JavaScript snippet <code>selenium.browserbot.getCurrentWindow()</code>, and then
   * run your JavaScript in there</p>
   * @param script the JavaScript snippet to run
   * @param timeout a timeout in milliseconds, after which this command will return with an error
   */
   
    return Selenium.decorateFunctionWithTimeout(function () {
        var window = selenium.browserbot.getCurrentWindow();
        return eval(script);
    }, timeout);
};

Selenium.prototype.doWaitForCondition.dontCheckAlertsAndConfirms = true;

Selenium.prototype.doSetTimeout = function(timeout) {
    /**
     * Specifies the amount of time that Selenium will wait for actions to complete.
     *
     * <p>Actions that require waiting include "open" and the "waitFor*" actions.</p>
     * The default timeout is 30 seconds.
     * @param timeout a timeout in milliseconds, after which the action will return with an error
     */
    if (!timeout) {
        timeout = Selenium.DEFAULT_TIMEOUT;
    }
    this.defaultTimeout = timeout;
}

Selenium.prototype.doWaitForPageToLoad = function(timeout) {
    /**
     * Waits for a new page to load.
     *
     * <p>You can use this command instead of the "AndWait" suffixes, "clickAndWait", "selectAndWait", "typeAndWait" etc.
     * (which are only available in the JS API).</p>
     *
     * <p>Selenium constantly keeps track of new pages loading, and sets a "newPageLoaded"
     * flag when it first notices a page load.  Running any other Selenium command after
     * turns the flag to false.  Hence, if you want to wait for a page to load, you must
     * wait immediately after a Selenium command that caused a page-load.</p>
     * @param timeout a timeout in milliseconds, after which this command will return with an error
     */
    // in pi-mode, the test and the harness share the window; thus if we are executing this code, then we have loaded
    if (window["proxyInjectionMode"] == null || !window["proxyInjectionMode"]) {
        return this.makePageLoadCondition(timeout);
    }
};

Selenium.prototype.doWaitForFrameToLoad = function(frameAddress, timeout) {
    /**
     * Waits for a new frame to load.
     *
     * <p>Selenium constantly keeps track of new pages and frames loading, 
     * and sets a "newPageLoaded" flag when it first notices a page load.</p>
     * 
     * See waitForPageToLoad for more information.
     * 
     * @param frameAddress FrameAddress from the server side
     * @param timeout a timeout in milliseconds, after which this command will return with an error
     */
    // in pi-mode, the test and the harness share the window; thus if we are executing this code, then we have loaded
    if (window["proxyInjectionMode"] == null || !window["proxyInjectionMode"]) {
        return this.makePageLoadCondition(timeout);
    }
};

Selenium.prototype._isNewPageLoaded = function() {
    return this.browserbot.isNewPageLoaded();
};

Selenium.prototype.doWaitForPageToLoad.dontCheckAlertsAndConfirms = true;

/**
 * Evaluate a parameter, performing JavaScript evaluation and variable substitution.
 * If the string matches the pattern "javascript{ ... }", evaluate the string between the braces.
 */
Selenium.prototype.preprocessParameter = function(value) {
    var match = value.match(/^javascript\{((.|\r?\n)+)\}$/);
    if (match && match[1]) {
        return eval(match[1]).toString();
    }
    return this.replaceVariables(value);
};

/*
 * Search through str and replace all variable references ${varName} with their
 * value in storedVars.
 */
Selenium.prototype.replaceVariables = function(str) {
    var stringResult = str;

    // Find all of the matching variable references
    var match = stringResult.match(/\$\{\w+\}/g);
    if (!match) {
        return stringResult;
    }

    // For each match, lookup the variable value, and replace if found
    for (var i = 0; match && i < match.length; i++) {
        var variable = match[i]; // The replacement variable, with ${}
        var name = variable.substring(2, variable.length - 1); // The replacement variable without ${}
        var replacement = storedVars[name];
        if (replacement != undefined) {
            stringResult = stringResult.replace(variable, replacement);
        }
    }
    return stringResult;
};

Selenium.prototype.getCookie = function() {
    /**
     * Return all cookies of the current page under test.
     *
     * @return string all cookies of the current page under test
     */
    var doc = this.browserbot.getDocument();
    return doc.cookie;
};

Selenium.prototype.getCookieByName = function(name) {
    /**
     * Returns the value of the cookie with the specified name, or throws an error if the cookie is not present.
     * @param name the name of the cookie
     * @return string the value of the cookie
     */
    var v = this.browserbot.getCookieByName(name);
    if (v === null) {
        throw new SeleniumError("Cookie '"+name+"' was not found");
    }
    return v;
};

Selenium.prototype.isCookiePresent = function(name) {
    /**
     * Returns true if a cookie with the specified name is present, or false otherwise.
     * @param name the name of the cookie
     * @return boolean true if a cookie with the specified name is present, or false otherwise.
     */
    var v = this.browserbot.getCookieByName(name);
    var absent = (v === null);
    return !absent;
}   

Selenium.prototype.doCreateCookie = function(nameValuePair, optionsString) {
    /**
     * Create a new cookie whose path and domain are same with those of current page
     * under test, unless you specified a path for this cookie explicitly.
     *
     * @param nameValuePair name and value of the cookie in a format "name=value"
     * @param optionsString options for the cookie. Currently supported options include 'path', 'max_age' and 'domain'.
     *      the optionsString's format is "path=/path/, max_age=60, domain=.foo.com". The order of options are irrelevant, the unit
     *      of the value of 'max_age' is second.  Note that specifying a domain that isn't a subset of the current domain will
     *      usually fail.
     */
    var results = /[^\s=\[\]\(\),"\/\?@:;]+=[^\s=\[\]\(\),"\/\?@:;]*/.test(nameValuePair);
    if (!results) {
        throw new SeleniumError("Invalid parameter.");
    }
    var cookie = nameValuePair.trim();
    results = /max_age=(\d+)/.exec(optionsString);
    if (results) {
        var expireDateInMilliseconds = (new Date()).getTime() + results[1] * 1000;
        cookie += "; expires=" + new Date(expireDateInMilliseconds).toGMTString();
    }
    results = /path=([^\s,]+)[,]?/.exec(optionsString);
    if (results) {
        var path = results[1];
        if (browserVersion.khtml) {
            // Safari and conquerer don't like paths with / at the end
            if ("/" != path) {
                path = path.replace(/\/$/, "");
            }
        }
        cookie += "; path=" + path;
    }
    results = /domain=([^\s,]+)[,]?/.exec(optionsString);
    if (results) {
        var domain = results[1];
        cookie += "; domain=" + domain;
    }
    LOG.debug("Setting cookie to: " + cookie);
    this.browserbot.getDocument().cookie = cookie;
}

Selenium.prototype.doDeleteCookie = function(name,optionsString) {
    /**
     * Delete a named cookie with specified path and domain.  Be careful; to delete a cookie, you
     * need to delete it using the exact same path and domain that were used to create the cookie.
     * If the path is wrong, or the domain is wrong, the cookie simply won't be deleted.  Also
     * note that specifying a domain that isn't a subset of the current domain will usually fail.
     *
     * Since there's no way to discover at runtime the original path and domain of a given cookie,
     * we've added an option called 'recurse' to try all sub-domains of the current domain with
     * all paths that are a subset of the current path.  Beware; this option can be slow.  In
     * big-O notation, it operates in O(n*m) time, where n is the number of dots in the domain
     * name and m is the number of slashes in the path.
     *
     * @param name the name of the cookie to be deleted
     * @param optionsString options for the cookie. Currently supported options include 'path', 'domain'
     *      and 'recurse.' The optionsString's format is "path=/path/, domain=.foo.com, recurse=true".
     *      The order of options are irrelevant. Note that specifying a domain that isn't a subset of
     *      the current domain will usually fail.
     */
    // set the expire time of the cookie to be deleted to one minute before now.
    var path = "";
    var domain = "";
    var recurse = false;
    var matched = false;
    results = /path=([^\s,]+)[,]?/.exec(optionsString);
    if (results) {
        matched = true;
        path = results[1];
    }
    results = /domain=([^\s,]+)[,]?/.exec(optionsString);
    if (results) {
        matched = true;
        domain = results[1];
    }
    results = /recurse=([^\s,]+)[,]?/.exec(optionsString);
    if (results) {
        matched = true;
        recurse = results[1];
        if ("false" == recurse) {
            recurse = false;
        }
    }
    // Treat the entire optionsString as a path (for backwards compatibility)
    if (optionsString && !matched) {
        LOG.warn("Using entire optionsString as a path; please change the argument to deleteCookie to use path="+optionsString);
        path = optionsString;
    }
    if (browserVersion.khtml) {
        // Safari and conquerer don't like paths with / at the end
        if ("/" != path) {
            path = path.replace(/\/$/, "");
        }
    }    
    path = path.trim();
    domain = domain.trim();
    var cookieName = name.trim();
    if (recurse) {
        this.browserbot.recursivelyDeleteCookie(cookieName, domain, path);
    } else {
        this.browserbot.deleteCookie(cookieName, domain, path);
    }
}

Selenium.prototype.doDeleteAllVisibleCookies = function() {
    /** Calls deleteCookie with recurse=true on all cookies visible to the current page.
    * As noted on the documentation for deleteCookie, recurse=true can be much slower
    * than simply deleting the cookies using a known domain/path.
    */
    var win = this.browserbot.getCurrentWindow();
    var doc = win.document;
    var cookieNames = this.browserbot.getAllCookieNames(doc);
    var domain = doc.domain;
    var path = win.location.pathname;
    for (var i = 0; i < cookieNames.length; i++) {
        this.browserbot.recursivelyDeleteCookie(cookieNames[i], domain, path, win);
    }
}

Selenium.prototype.doSetBrowserLogLevel = function(logLevel) {
    /**
    * Sets the threshold for browser-side logging messages; log messages beneath this threshold will be discarded.
    * Valid logLevel strings are: "debug", "info", "warn", "error" or "off".
    * To see the browser logs, you need to
    * either show the log window in GUI mode, or enable browser-side logging in Selenium RC.
    *
    * @param logLevel one of the following: "debug", "info", "warn", "error" or "off"
    */
    if (logLevel == null || logLevel == "") {
        throw new SeleniumError("You must specify a log level");
    }
    logLevel = logLevel.toLowerCase();
    if (LOG.logLevels[logLevel] == null) {
        throw new SeleniumError("Invalid log level: " + logLevel);
    }
    LOG.setLogLevelThreshold(logLevel);
}

Selenium.prototype.doRunScript = function(script) {
    /**
    * Creates a new "script" tag in the body of the current test window, and 
    * adds the specified text into the body of the command.  Scripts run in
    * this way can often be debugged more easily than scripts executed using
    * Selenium's "getEval" command.  Beware that JS exceptions thrown in these script
    * tags aren't managed by Selenium, so you should probably wrap your script
    * in try/catch blocks if there is any chance that the script will throw
    * an exception.
    * @param script the JavaScript snippet to run
    */
    var win = this.browserbot.getCurrentWindow();
    var doc = win.document;
    var scriptTag = doc.createElement("script");
    scriptTag.type = "text/javascript"
    scriptTag.text = script;
    doc.body.appendChild(scriptTag);
}

Selenium.prototype.doAddLocationStrategy = function(strategyName, functionDefinition) {
    /**
    * Defines a new function for Selenium to locate elements on the page.
    * For example,
    * if you define the strategy "foo", and someone runs click("foo=blah"), we'll
    * run your function, passing you the string "blah", and click on the element 
    * that your function
    * returns, or throw an "Element not found" error if your function returns null.
    *
    * We'll pass three arguments to your function:
    * <ul>
    * <li>locator: the string the user passed in</li>
    * <li>inWindow: the currently selected window</li>
    * <li>inDocument: the currently selected document</li>
    * </ul>
    * The function must return null if the element can't be found.
    * 
    * @param strategyName the name of the strategy to define; this should use only
    *   letters [a-zA-Z] with no spaces or other punctuation.
    * @param functionDefinition a string defining the body of a function in JavaScript.
    *   For example: <code>return inDocument.getElementById(locator);</code>
    */
    if (!/^[a-zA-Z]+$/.test(strategyName)) {
        throw new SeleniumError("Invalid strategy name: " + strategyName);
    }
    var strategyFunction;
    try {
        strategyFunction = new Function("locator", "inDocument", "inWindow", functionDefinition);
    } catch (ex) {
        throw new SeleniumError("Error evaluating function definition: " + extractExceptionMessage(ex));
    }
    var safeStrategyFunction = function() {
        try {
            return strategyFunction.apply(this, arguments);
        } catch (ex) {
            throw new SeleniumError("Error executing strategy function " + strategyName + ": " + extractExceptionMessage(ex));
        }
    }
    this.browserbot.locationStrategies[strategyName] = safeStrategyFunction;
}

Selenium.prototype.doCaptureEntirePageScreenshot = function(filename, kwargs) {
    /**
     * Saves the entire contents of the current window canvas to a PNG file.
     * Contrast this with the captureScreenshot command, which captures the
     * contents of the OS viewport (i.e. whatever is currently being displayed
     * on the monitor), and is implemented in the RC only. Currently this only
     * works in Firefox when running in chrome mode, and in IE non-HTA using
     * the EXPERIMENTAL "Snapsie" utility. The Firefox implementation is mostly
     * borrowed from the Screengrab! Firefox extension. Please see
     * http://www.screengrab.org and http://snapsie.sourceforge.net/ for
     * details.
     *
     * @param filename  the path to the file to persist the screenshot as. No
     *                  filename extension will be appended by default.
     *                  Directories will not be created if they do not exist,  
     *                  and an exception will be thrown, possibly by native
     *                  code.
     * @param kwargs    a kwargs string that modifies the way the screenshot
     *                  is captured. Example: "background=#CCFFDD" .
     *                  Currently valid options:
     *                  <dl>
     *                   <dt>background</dt>
     *                     <dd>the background CSS for the HTML document. This
     *                     may be useful to set for capturing screenshots of
     *                     less-than-ideal layouts, for example where absolute
     *                     positioning causes the calculation of the canvas
     *                     dimension to fail and a black background is exposed
     *                     (possibly obscuring black text).</dd>
     *                  </dl>
     */
    if (! browserVersion.isChrome &&
        ! (browserVersion.isIE && ! browserVersion.isHTA)) {
        throw new SeleniumError('captureEntirePageScreenshot is only '
            + 'implemented for Firefox ("firefox" or "chrome", NOT '
            + '"firefoxproxy") and IE non-HTA ("iexploreproxy", NOT "iexplore" '
            + 'or "iehta"). The current browser isn\'t one of them!');
    }
    
    // do or do not ... there is no try
    
    if (browserVersion.isIE) {
        // targeting snapsIE >= 0.2
        function getFailureMessage(exceptionMessage) {
            var msg = 'Snapsie failed: ';
            if (exceptionMessage) {
                if (exceptionMessage ==
                    "Automation server can't create object") {
                    msg += 'Is it installed? Does it have permission to run '
                        + 'as an add-on? See http://snapsie.sourceforge.net/';
                }
                else {
                    msg += exceptionMessage;
                }
            }
            else {
                msg += 'Undocumented error';
            }
            return msg;
        }
    
        if (typeof(runOptions) != 'undefined' &&
            runOptions.isMultiWindowMode() == false) {
            // framed mode
            try {
                new Snapsie().saveSnapshot(filename, 'selenium_myiframe');
            }
            catch (e) {
                throw new SeleniumError(getFailureMessage(e.message));
            }
        }
        else {
            // multi-window mode
            if (!this.snapsieSrc) {
                // XXX - cache snapsie, and capture the screenshot as a
                // callback. Definitely a hack, because we may be late taking
                // the first screenshot, but saves us from polluting other code
                // for now. I wish there were an easier way to get at the
                // contents of a referenced script!
                var snapsieUrl = (this.browserbot.buttonWindow.location.href)
                    .replace(/(Test|Remote)Runner\.html/, 'lib/snapsie.js');
                var self = this;
                new Ajax.Request(snapsieUrl, {
                    method: 'get'
                    , onSuccess: function(transport) {
                        self.snapsieSrc = transport.responseText;
                        self.doCaptureEntirePageScreenshot(filename, kwargs);
                    }
                });
                return;
            }

            // it's going into a string, so escape the backslashes
            filename = filename.replace(/\\/g, '\\\\');
            
            // this is sort of hackish. We insert a script into the document,
            // and remove it before anyone notices.
            var doc = selenium.browserbot.getDocument();
            var script = doc.createElement('script'); 
            var scriptContent = this.snapsieSrc 
                + 'try {'
                + '    new Snapsie().saveSnapshot("' + filename + '");'
                + '}'
                + 'catch (e) {'
                + '    document.getElementById("takeScreenshot").failure ='
                + '        e.message;'
                + '}';
            script.id = 'takeScreenshot';
            script.language = 'javascript';
            script.text = scriptContent;
            doc.body.appendChild(script);
            script.parentNode.removeChild(script);
            if (script.failure) {
                throw new SeleniumError(getFailureMessage(script.failure));
            }
        }
        return;
    }
    
    var grabber = {
        prepareCanvas: function(width, height) {
            var styleWidth = width + 'px';
            var styleHeight = height + 'px';
            
            var grabCanvas = document.getElementById('screenshot_canvas');
            if (!grabCanvas) {
                // create the canvas
                var ns = 'http://www.w3.org/1999/xhtml';
                grabCanvas = document.createElementNS(ns, 'html:canvas');
                grabCanvas.id = 'screenshot_canvas';
                grabCanvas.style.display = 'none';
                document.documentElement.appendChild(grabCanvas);
            }
            
            grabCanvas.width = width;
            grabCanvas.style.width = styleWidth;
            grabCanvas.style.maxWidth = styleWidth;
            grabCanvas.height = height;
            grabCanvas.style.height = styleHeight;
            grabCanvas.style.maxHeight = styleHeight;
        
            return grabCanvas;
        },
        
        prepareContext: function(canvas, box) {
            var context = canvas.getContext('2d');
            context.clearRect(box.x, box.y, box.width, box.height);
            context.save();
            return context;
        }
    };
    
    var SGNsUtils = {
        dataUrlToBinaryInputStream: function(dataUrl) {
            var nsIoService = Components.classes["@mozilla.org/network/io-service;1"]
                .getService(Components.interfaces.nsIIOService);
            var channel = nsIoService
                .newChannelFromURI(nsIoService.newURI(dataUrl, null, null));
            var binaryInputStream = Components.classes["@mozilla.org/binaryinputstream;1"]
                .createInstance(Components.interfaces.nsIBinaryInputStream);
            
            binaryInputStream.setInputStream(channel.open());
            return binaryInputStream;
        },
        
        newFileOutputStream: function(nsFile) {
            var writeFlag = 0x02; // write only
            var createFlag = 0x08; // create
            var truncateFlag = 0x20; // truncate
            var fileOutputStream = Components.classes["@mozilla.org/network/file-output-stream;1"]
                .createInstance(Components.interfaces.nsIFileOutputStream);
                
            fileOutputStream.init(nsFile,
                writeFlag | createFlag | truncateFlag, 0664, null);
            return fileOutputStream;
        },
        
        writeBinaryInputStreamToFileOutputStream:
        function(binaryInputStream, fileOutputStream) {
            var numBytes = binaryInputStream.available();
            var bytes = binaryInputStream.readBytes(numBytes);
            fileOutputStream.write(bytes, numBytes);
        }
    };
    
    // compute dimensions
    var window = this.browserbot.getCurrentWindow();
    var doc = window.document.documentElement;
    var box = {
        x: 0,
        y: 0,
        width: doc.scrollWidth,
        height: doc.scrollHeight
    };
    LOG.debug('computed dimensions');
    
    var originalBackground = doc.style.background;
    
    if (kwargs) {
        var args = parse_kwargs(kwargs);
        if (args.background) {
            doc.style.background = args.background;
        }
    }
    
    // grab
    var format = 'png';
    var canvas = grabber.prepareCanvas(box.width, box.height);
    var context = grabber.prepareContext(canvas, box);
    context.drawWindow(window, box.x, box.y, box.width, box.height,
        'rgb(0, 0, 0)');
    context.restore();
    var dataUrl = canvas.toDataURL("image/" + format);
    LOG.debug('grabbed to canvas');
    
    doc.style.background = originalBackground;
    
    // save to file
    var nsFile = Components.classes["@mozilla.org/file/local;1"]
        .createInstance(Components.interfaces.nsILocalFile);
    try {
        nsFile.initWithPath(filename);
    }
    catch (e) {
        if (/NS_ERROR_FILE_UNRECOGNIZED_PATH/.test(e.message)) {
            // try using the opposite file separator
            if (filename.indexOf('/') != -1) {
                filename = filename.replace(/\//g, '\\');
            }
            else {
                filename = filename.replace(/\\/g, '/');
            }
            nsFile.initWithPath(filename);
        }
        else {
            throw e;
        }
    }
    var binaryInputStream = SGNsUtils.dataUrlToBinaryInputStream(dataUrl);
    var fileOutputStream = SGNsUtils.newFileOutputStream(nsFile);
    SGNsUtils.writeBinaryInputStreamToFileOutputStream(binaryInputStream,
        fileOutputStream);
    fileOutputStream.close();
    LOG.debug('saved to file');
};

Selenium.prototype.doRollup = function(rollupName, kwargs) {
    /**
     * Executes a command rollup, which is a series of commands with a unique
     * name, and optionally arguments that control the generation of the set of
     * commands. If any one of the rolled-up commands fails, the rollup is
     * considered to have failed. Rollups may also contain nested rollups.
     *
     * @param rollupName  the name of the rollup command
     * @param kwargs      keyword arguments string that influences how the
     *                    rollup expands into commands
     */
    // we have to temporarily hijack the commandStarted, nextCommand(),
    // commandComplete(), and commandError() methods of the TestLoop object.
    // When the expanded rollup commands are done executing (or an error has
    // occurred), we'll restore them to their original values.
    var loop = currentTest || htmlTestRunner.currentTest;
    var backupManager = {
        backup: function() {
            for (var item in this.data) {
                this.data[item] = loop[item];
            }
        }
        , restore: function() {
            for (var item in this.data) {
                loop[item] = this.data[item];
            }
        }
        , data: {
            requiresCallBack: null
            , commandStarted: null
            , nextCommand: null
            , commandComplete: null
            , commandError: null
            , pendingRollupCommands: null
            , rollupFailed: null
            , rollupFailedMessage: null
        }
    };
    
    var rule = RollupManager.getInstance().getRollupRule(rollupName);
    var expandedCommands = rule.getExpandedCommands(kwargs);
    
    // hold your breath ...
    try {
        backupManager.backup();
        loop.requiresCallBack = false;
        loop.commandStarted = function() {};
        loop.nextCommand = function() {
            if (this.pendingRollupCommands.length == 0) {
                return null;
            }
            var command = this.pendingRollupCommands.shift();
            return command;
        };
        loop.commandComplete = function(result) {
            if (result.failed) {
                this.rollupFailed = true;
                this.rollupFailureMessages.push(result.failureMessage);
            }
            
            if (this.pendingRollupCommands.length == 0) {
                result = {
                    failed: this.rollupFailed
                    , failureMessage: this.rollupFailureMessages.join('; ')
                };
                LOG.info('Rollup execution complete: ' + (result.failed
                    ? 'failed! (see error messages below)' : 'ok'));
                backupManager.restore();
                this.commandComplete(result);
            }
        };
        loop.commandError = function(errorMessage) {
            LOG.info('Rollup execution complete: bombed!');
            backupManager.restore();
            this.commandError(errorMessage);
        };
        
        loop.pendingRollupCommands = expandedCommands;
        loop.rollupFailed = false;
        loop.rollupFailureMessages = [];
    }
    catch (e) {
        LOG.error('Rollup error: ' + e);
        backupManager.restore();
    }
};

Selenium.prototype.doAddScript = function(scriptContent, scriptTagId) {
    /**
    * Loads script content into a new script tag in the Selenium document. This
    * differs from the runScript command in that runScript adds the script tag
    * to the document of the AUT, not the Selenium document. The following
    * entities in the script content are replaced by the characters they
    * represent:
    *
    *     &lt;
    *     &gt;
    *     &amp;
    *
    * The corresponding remove command is removeScript.
    *
    * @param scriptContent  the Javascript content of the script to add
    * @param scriptTagId    (optional) the id of the new script tag. If
    *                       specified, and an element with this id already
    *                       exists, this operation will fail.
    */
    if (scriptTagId && document.getElementById(scriptTagId)) {
        var msg = "Element with id '" + scriptTagId + "' already exists!";
        throw new SeleniumError(msg);
    }
    
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    
    script.type = 'text/javascript';
    
    if (scriptTagId) {
        script.id = scriptTagId;
    }
    
    // replace some entities
    scriptContent = scriptContent
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');
    
    script.text = scriptContent;
    head.appendChild(script);
};

Selenium.prototype.doRemoveScript = function(scriptTagId) {
    /**
    * Removes a script tag from the Selenium document identified by the given
    * id. Does nothing if the referenced tag doesn't exist.
    *
    * @param scriptTagId  the id of the script element to remove.
    */
    var script = document.getElementById(scriptTagId);
    
    if (script && getTagName(script) == 'script') {
        script.parentNode.removeChild(script);
    }
};

Selenium.prototype.doUseXpathLibrary = function(libraryName) {
    /**
	* Allows choice of one of the available libraries.
    * @param libraryName name of the desired library
    * Only the following three can be chosen:
    * <ul>
    *   <li>"ajaxslt" - Google's library</li>
    *   <li>"javascript-xpath" - Cybozu Labs' faster library</li>
    *   <li>"default" - The default library.  Currently the default library is "ajaxslt" .</li>
    * </ul>
    * If libraryName isn't one of these three, then 
    * no change will be made.
    *   
    */

    if (libraryName == "default") {
        this.browserbot.xpathLibrary = this.browserbot.defaultXpathLibrary;
        return;
    }

	if ((libraryName != 'ajaxslt') && (libraryName != 'javascript-xpath')) {
		return;
	}
	
	this.browserbot.xpathLibrary = libraryName;	
	
};

/**
 *  Factory for creating "Option Locators".
 *  An OptionLocator is an object for dealing with Select options (e.g. for
 *  finding a specified option, or asserting that the selected option of 
 *  Select element matches some condition.
 *  The type of locator returned by the factory depends on the locator string:
 *     label=<exp>  (OptionLocatorByLabel)
 *     value=<exp>  (OptionLocatorByValue)
 *     index=<exp>  (OptionLocatorByIndex)
 *     id=<exp>     (OptionLocatorById)
 *     <exp> (default is OptionLocatorByLabel).
 */
function OptionLocatorFactory() {
}

OptionLocatorFactory.prototype.fromLocatorString = function(locatorString) {
    var locatorType = 'label';
    var locatorValue = locatorString;
    // If there is a locator prefix, use the specified strategy
    var result = locatorString.match(/^([a-zA-Z]+)=(.*)/);
    if (result) {
        locatorType = result[1];
        locatorValue = result[2];
    }
    if (this.optionLocators == undefined) {
        this.registerOptionLocators();
    }
    if (this.optionLocators[locatorType]) {
        return new this.optionLocators[locatorType](locatorValue);
    }
    throw new SeleniumError("Unknown option locator type: " + locatorType);
};

/**
 * To allow for easy extension, all of the option locators are found by
 * searching for all methods of OptionLocatorFactory.prototype that start
 * with "OptionLocatorBy".
 * TODO: Consider using the term "Option Specifier" instead of "Option Locator".
 */
OptionLocatorFactory.prototype.registerOptionLocators = function() {
    this.optionLocators={};
    for (var functionName in this) {
      var result = /OptionLocatorBy([A-Z].+)$/.exec(functionName);
      if (result != null) {
          var locatorName = result[1].lcfirst();
          this.optionLocators[locatorName] = this[functionName];
      }
    }
};

/**
 *  OptionLocator for options identified by their labels.
 */
OptionLocatorFactory.prototype.OptionLocatorByLabel = function(label) {
    this.label = label;
    this.labelMatcher = new PatternMatcher(this.label);
    this.findOption = function(element) {
        for (var i = 0; i < element.options.length; i++) {
            if (this.labelMatcher.matches(element.options[i].text)) {
                return element.options[i];
            }
        }
        throw new SeleniumError("Option with label '" + this.label + "' not found");
    };

    this.assertSelected = function(element) {
        var selectedLabel = element.options[element.selectedIndex].text;
        Assert.matches(this.label, selectedLabel)
    };
};

/**
 *  OptionLocator for options identified by their values.
 */
OptionLocatorFactory.prototype.OptionLocatorByValue = function(value) {
    this.value = value;
    this.valueMatcher = new PatternMatcher(this.value);
    this.findOption = function(element) {
        for (var i = 0; i < element.options.length; i++) {
            if (this.valueMatcher.matches(element.options[i].value)) {
                return element.options[i];
            }
        }
        throw new SeleniumError("Option with value '" + this.value + "' not found");
    };

    this.assertSelected = function(element) {
        var selectedValue = element.options[element.selectedIndex].value;
        Assert.matches(this.value, selectedValue)
    };
};

/**
 *  OptionLocator for options identified by their index.
 */
OptionLocatorFactory.prototype.OptionLocatorByIndex = function(index) {
    this.index = Number(index);
    if (isNaN(this.index) || this.index < 0) {
        throw new SeleniumError("Illegal Index: " + index);
    }

    this.findOption = function(element) {
        if (element.options.length <= this.index) {
            throw new SeleniumError("Index out of range.  Only " + element.options.length + " options available");
        }
        return element.options[this.index];
    };

    this.assertSelected = function(element) {
        Assert.equals(this.index, element.selectedIndex);
    };
};

/**
 *  OptionLocator for options identified by their id.
 */
OptionLocatorFactory.prototype.OptionLocatorById = function(id) {
    this.id = id;
    this.idMatcher = new PatternMatcher(this.id);
    this.findOption = function(element) {
        for (var i = 0; i < element.options.length; i++) {
            if (this.idMatcher.matches(element.options[i].id)) {
                return element.options[i];
            }
        }
        throw new SeleniumError("Option with id '" + this.id + "' not found");
    };

    this.assertSelected = function(element) {
        var selectedId = element.options[element.selectedIndex].id;
        Assert.matches(this.id, selectedId)
    };
};
