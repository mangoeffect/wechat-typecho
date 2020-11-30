<wxs src="./handler.wxs" module="handler"></wxs>
<view class="{{['interlayer '+(c||'')]}}" style="{{(s)}}"><block qq:for="{{nodes}}" qq:for-item="n" qq:for-index="i" qq:key="i"><block><block qq:if="{{n.name=='img'}}"><view class="{{['_img '+n.attrs.class]}}" style="{{(n.attrs.style)}}" data-attrs="{{n.attrs}}" data-event-opts="{{[['tap',[['imgtap',['$event']]]]]}}" bindtap="__e"><block qq:if="{{ctrl[i]!=0}}"><rich-text nodes="{{[{attrs:{src:loading&&(ctrl[i]||0)<2?loading:lazyLoad&&!ctrl[i]?placeholder:ctrl[i]==3?errorImg:n.attrs.src||'',alt:n.attrs.alt||'',width:n.attrs.width||'',style:'-webkit-touch-callout:none;max-width:100%;display:block'+(n.attrs.height?';height:'+n.attrs.height:'')},name:'img'}]}}"></rich-text></block><image class="_image" src="{{lazyLoad&&!ctrl[i]?placeholder:n.attrs.src}}" lazy-load="{{lazyLoad}}" show-menu-by-longpress="{{!n.attrs.ignore}}" data-i="{{i}}" data-index="{{n.attrs.i}}" data-source="img" data-event-opts="{{[['load',[['loadImg',['$event']]]],['error',[['error',['$event']]]]]}}" bindload="__e" binderror="__e"></image></view></block><block qq:else><block qq:if="{{n.type=='text'}}"><text decode="{{true}}">{{n.text}}</text></block><block qq:else><block qq:if="{{n.name=='br'}}"><text>\n</text></block><block qq:else><block qq:if="{{(n.lazyLoad&&!n.attrs.autoplay||n.name=='video'&&!loadVideo)&&ctrl[i]==undefined}}"><view class="{{['_video '+(n.attrs.class||'')]}}" style="{{(n.attrs.style)}}" id="{{n.attrs.id}}" data-i="{{i}}" data-event-opts="{{[['tap',[['_loadVideo',['$event']]]]]}}" bindtap="__e"></view></block><block qq:else><block qq:if="{{n.name=='video'}}"><video class="{{[n.attrs.class]}}" style="{{(n.attrs.style)}}" id="{{n.attrs.id}}" autoplay="{{n.attrs.autoplay||ctrl[i]==0}}" controls="{{n.attrs.controls}}" loop="{{n.attrs.loop}}" poster="{{n.attrs.poster}}" src="{{n.attrs.source[ctrl[i]||0]}}" unit-id="{{n.attrs['unit-id']}}" data-id="{{n.attrs.id}}" data-i="{{i}}" data-source="video" data-event-opts="{{[['error',[['error',['$event']]]],['play',[['play',['$event']]]]]}}" muted="{{n.attrs.muted}}" binderror="__e" bindplay="__e"></video></block><block qq:else><block qq:if="{{n.name=='audio'}}"><audio class="{{['vue-ref-in-for',n.attrs.class]}}" style="{{(n.attrs.style)}}" author="{{n.attrs.author}}" autoplay="{{n.attrs.autoplay}}" controls="{{n.attrs.controls}}" loop="{{n.attrs.loop}}" name="{{n.attrs.name}}" poster="{{n.attrs.poster}}" src="{{n.attrs.source[ctrl[i]||0]}}" data-i="{{i}}" data-id="{{n.attrs.id}}" data-source="audio" data-ref="{{n.attrs.id}}" data-event-opts="{{[['error',[['error',['$event']]]],['play',[['play',['$event']]]]]}}" binderror="__e" bindplay="__e"></audio></block><block qq:else><block qq:if="{{n.name=='a'}}"><view class="{{['_a '+(n.attrs.class||'')]}}" style="{{(n.attrs.style)}}" id="{{n.attrs.id}}" hover-class="_hover" data-attrs="{{n.attrs}}" data-event-opts="{{[['tap',[['linkpress',['$event']]]]]}}" bindtap="__e"><trees class="_span" vue-id="{{'13da118d-1-'+i}}" c="_span" nodes="{{n.children}}" bind:__l="__l"></trees></view></block><block qq:else><block qq:if="{{n.name=='li'}}"><view class="{{[n.attrs.class]}}" style="{{((n.attrs.style||'')+';display:flex;flex-direction:row')}}" id="{{n.attrs.id}}"><block qq:if="{{n.type=='ol'}}"><view class="_ol-bef">{{n.num}}</view></block><block qq:else><view class="_ul-bef"><block qq:if="{{n.floor%3==0}}"><view class="_ul-p1">█</view></block><block qq:else><block qq:if="{{n.floor%3==2}}"><view class="_ul-p2"></view></block><block qq:else><view class="_ul-p1" style="border-radius:50%;">█</view></block></block></view></block><trees class="_li" vue-id="{{'13da118d-2-'+i}}" c="_li" nodes="{{n.children}}" lazyLoad="{{lazyLoad}}" loading="{{loading}}" bind:__l="__l"></trees></view></block><block qq:else><block qq:if="{{n.name=='table'&&n.c}}"><view class="{{[n.attrs.class]}}" style="{{((n.attrs.style||'')+';display:table')}}" id="{{n.attrs.id}}"><block qq:for="{{n.children}}" qq:for-item="tbody" qq:for-index="o" qq:key="o"><view class="{{[tbody.attrs.class]}}" style="{{((tbody.attrs.style||'')+(tbody.name[0]=='t'?';display:table-'+(tbody.name=='tr'?'row':'row-group'):''))}}"><block qq:for="{{tbody.children}}" qq:for-item="tr" qq:for-index="p" qq:key="p"><view class="{{[tr.attrs.class]}}" style="{{((tr.attrs.style||'')+(tr.name[0]=='t'?';display:table-'+(tr.name=='tr'?'row':'cell'):''))}}"><block qq:if="{{tr.name=='td'}}"><trees vue-id="{{'13da118d-3-'+i+'-'+o+'-'+p}}" nodes="{{tr.children}}" bind:__l="__l"></trees></block><block qq:else><block qq:for="{{tr.children}}" qq:for-item="td" qq:for-index="q" qq:key="q"><trees class="{{[td.attrs.class]}}" style="{{((td.attrs.style||'')+(td.name[0]=='t'?';display:table-'+(td.name=='tr'?'row':'cell'):''))}}" vue-id="{{'13da118d-4-'+i+'-'+o+'-'+p+'-'+q}}" c="{{td.attrs.class}}" s="{{(td.attrs.style||'')+(td.name[0]=='t'?';display:table-'+(td.name=='tr'?'row':'cell'):'')}}" nodes="{{td.children}}" bind:__l="__l"></trees></block></block></view></block></view></block></view></block><block qq:else><block qq:if="{{handler.use(n)}}"><rich-text class="{{['_p __'+n.name]}}" id="{{n.attrs.id}}" nodes="{{[n]}}"></rich-text></block><block qq:else><trees class="{{[(n.attrs.id||'')+' _'+n.name+' '+(n.attrs.class||'')]}}" style="{{(n.attrs.style)}}" vue-id="{{'13da118d-5-'+i}}" c="{{(n.attrs.id||'')+' _'+n.name+' '+(n.attrs.class||'')}}" s="{{n.attrs.style}}" nodes="{{n.children}}" lazyLoad="{{lazyLoad}}" loading="{{loading}}" bind:__l="__l"></trees></block></block></block></block></block></block></block></block></block></block></block></block></view>