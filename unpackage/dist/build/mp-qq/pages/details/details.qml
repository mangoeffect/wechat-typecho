<view><view class="top"><view class="title">{{title}}</view><view style="display:flex;"><view class="time">{{time}}</view><view class="views"><text class="cuIcon-attention margin-right-xs"></text>{{''+views+''}}</view></view></view><view class="content"><jyf-parser vue-id="39cbdc54-1" html="{{content}}" use-cache="{{true}}" show-with-animation="{{true}}" bind:__l="__l"></jyf-parser></view><block qq:if="{{encrypted!=''}}"><view class="encryption"><block qq:if="{{!decrypt}}"><view><view class="encryption_title">该文章有加密内容</view><view class="flexa"><button data-event-opts="{{[['tap',[['adGet',['$event']]]]]}}" class="adget" bindtap="__e">广告解锁</button></view></view></block><block qq:else><view><view class="encryption_title">恭喜您解锁了该内容</view><view class="encrypted_content">{{encrypted}}</view><button data-event-opts="{{[['tap',[['copy',['$0'],['encrypted']]]]]}}" class="copy" bindtap="__e">复制内容</button></view></block></view></block><block qq:if="{{showLogin}}"><view class="mask" catchtouchmove="ture" data-event-opts="{{[['touchmove',[['',['$event']]]]]}}" bindtouchmove="__e"><view class="login"><view class="login_title">用户登录</view><view class="login_content">博客部分操作需要您登录后才可以进行，点击登录按钮即可登录</view><image src="../../static/login.png" mode="widthFix"></image><view class="login_btn"><button data-event-opts="{{[['tap',[['colseLogin',['$event']]]]]}}" bindtap="__e">算了</button><button open-type="getUserInfo" data-event-opts="{{[['getuserinfo',[['getuserinfo',['$event']]]]]}}" bindgetuserinfo="__e">登录</button></view></view></view></block><view class="ad"><ad unit-id="adunit-b1362a923c58a450"></ad></view><view class="copyright" style="{{(showshare!='1'||commentsNum=='0'?'margin-bottom: 100rpx;':'')}}"><view class="website">{{website}}</view></view><block qq:if="{{showshare=='1'}}"><view><block qq:if="{{commentsNum!='0'}}"><view class="comments"><view class="comments_title">评论列表</view><block qq:for="{{$root.l0}}" qq:for-item="item" qq:for-index="index" qq:key="index"><view class="comments_des"><view class="comments_flex"><block qq:if="{{item.$orig.authorImg!=null&&item.$orig.authorImg!='undefined'}}"><image src="{{item.$orig.authorImg}}" mode="widthFix"></image></block><block qq:else><view class="author">A</view></block><view class="comments_name">{{item.$orig.author}}</view><view class="time">{{item.m0}}</view></view><view class="comment">{{item.$orig.text}}</view><block qq:if="{{item.$orig.replays}}"><view class="replays"><view class="replays_author">{{item.$orig.replays[0].author}}</view><view class="replays_text">{{item.$orig.replays[0].text}}</view></view></block></view></block></view></block></view></block><view class="btm"><button data-event-opts="{{[['tap',[['fabulous',['$event']]]]]}}" class="likes" bindtap="__e"><block qq:if="{{isLike=='false'}}"><image src="../../static/details/dianzan.png" mode="widthFix"></image></block><block qq:else><image src="../../static/details/dianzan_c.png" mode="widthFix"></image></block><view>{{likes}}</view></button><block qq:if="{{showshare=='1'}}"><button data-event-opts="{{[['tap',[['showInp',['$event']]]]]}}" bindtap="__e"><block qq:if="{{!showCmt}}"><image src="../../static/details/pinglun.png" mode="widthFix"></image></block><block qq:else><image src="../../static/details/pinglun_c.png" mode="widthFix"></image></block></button></block><button open-type="share"><image src="../../static/details/fenxiang.png" mode="widthFix"></image></button><button data-event-opts="{{[['tap',[['getPoster',['$event']]]]]}}" bindtap="__e"><image src="../../static/details/haibao.png" mode="widthFix"></image></button></view><block qq:if="{{showCmt}}"><view class="cmt_input"><input placeholder="请输入评论内容" placeholder-class="placeholder" data-event-opts="{{[['confirm',[['addComment',['$event']]]],['input',[['__set_model',['','commentText','$event',[]]]]]]}}" value="{{commentText}}" bindconfirm="__e" bindinput="__e"/></view></block><view class="canvas-box"><canvas class="canvas" style="width:350px;height:600px;" canvas-id="canvas"></canvas></view><block qq:if="{{showPoster}}"><view class="mask_poster" catchtouchmove="ture" data-event-opts="{{[['touchmove',[['',['$event']]]]]}}" bindtouchmove="__e"><block qq:if="{{poster}}"><image class="poster" src="{{poster}}" mode="widthFix"></image></block><view class="poster_btn"><button data-event-opts="{{[['tap',[['closePoster',['$event']]]]]}}" class="close" bindtap="__e">还是算了</button><button data-event-opts="{{[['tap',[['savePoster',['$event']]]]]}}" class="save_poster" bindtap="__e">立即保存</button></view></view></block></view>