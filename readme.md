# GatherTown ChatList AutoScroller

![Gather Screenshot](./public/screenshot.png "screenshot")

Chrome Extension for GatherTown ChatList Scroll Bug

## Purpose

게더타운을 오래 켜두면 어느샌가 스크롤이 안되는 버그가 있어 해당 부분을 자동 스크롤 해주는 익스텐션 입니다.

app.gather.town URL 에서만 동작 하며,
이 앱은 GatherTown 측에서 스타일이나 기능변경시 동작을 하지 않을 수 있습니다.

It is an extension that automatically scrolls through the area because there is a bug that cannot be scrolled if you leave Gettown on for a long time.

Only works with the app.gather.town URL
This app may not work when changing the style or function on the GatherTown side.

## installation

[Store Link](https://chrome.google.com/webstore/detail/gathertown-chatlist-autos/mcnbineeepplffbkkjbledilnioccnko)

크롬 웹 스토어 에서 **GatherTown ChatList AutoScroller** 검색 (대 소문자 유의)

## How To Work

content_script inject 방식으로 작동합니다.
특정 URL `https://app.gather.town/app/*`의 스페이스에서만 작동하며 자동으로 인젝팅 됩니다.
챗 리스트를 열면 상단에 toggle scroll checkbox로 컨트롤 하시면 됩니다.


