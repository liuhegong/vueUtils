<template>
  <div style="width: 100%;height: 100%;">
    <ezflycard
        @onDragMove='onCardDragMove'
        @onDragStop='onCardDragStop'
        @onThrowDone='onCardThrowDone'
        :cardWidth="300"
        :cardHeight="120"
        :throwTriggerDistance="100"
        dragDirection="horizontal"
        :hasShadow="true"
    >
      <div slot="firstCard" style="width:100%;height:100%;">
        <div v-if="cards[0]" class="zhihuCard">
          <div>{{ cards[0].title }}</div>
          <div>
            <div>{{ cards[0].followcount }} 关注</div>
            <div>
              <button disabled="">忽略</button>
              <button type="primary">回答</button>
            </div>
          </div>
        </div>
      </div>
      <div slot="secondCard" style="width:100%;height:100%;">
        <div v-if="cards[1]" class="zhihuCard">
          <div>{{ cards[1].title }}</div>
          <div>
            <div>{{ cards[1].followcount }} 关注</div>
            <div>
              <button disabled="">忽略</button>
              <button type="primary">回答</button>
            </div>
          </div>
        </div>
      </div>
      <div slot="thirdCard" style="width:100%;height:100%;">
        <div v-if="cards[2]" class="zhihuCard">
          <div>{{ cards[2].title }}</div>
          <div>
            <div>{{ cards[2].followcount }} 关注</div>
            <div>
              <button disabled="">忽略</button>
              <button type="primary">回答</button>
            </div>
          </div>
        </div>
      </div>
    </ezflycard>
  </div>

</template>

<script>
import ezflycard from "@/components/ezflycard";

export default {
  components: {
    ezflycard
  },
  data() {
    return {
      title: 'Hello',
      cards: [
        {
          title: "js数组怎么遍历删除指定元素，最后全部删除？",
          followcount: 6
        },
        {
          title: "前端自学，前后端的交互应该学哪些，要重点学哪里？",
          followcount: 13
        },
        {
          title: "我们花那么多时间在游戏《塞尔达传说：旷野之息》里，到底得到了什么？",
          followcount: 29
        },
        {
          title: "跪求这个图片用HTML，CSS如何做出来？",
          followcount: 6
        }
      ]
    }
  },
  onLoad() {

  },
  methods: {
    onCardDragMove(obj) {

    },
    onCardDragStop(obj) {

    },
    onCardThrowDone(obj) {
      let now = this.cards[0];
      this.cards.splice(0, 1);
      this.cards.push(now)
    }
  }
}
</script>

<style scoped>
page {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

div {
  box-sizing: border-box;
}

.zhihuCard {
  padding: 10px;
}

.zhihuCard:nth-child(1) {
  font-size: 18px;
}

.zhihuCard > div:nth-child(2) {
  display: flex;
  position: absolute;
  width: 100%;
  left: 0px;
  bottom: 10px;
  padding: 0px 10px;
}

.zhihuCard > div:nth-child(2) > div:nth-child(1) {
  flex: 1;
  font-size: 14px;
  color: #666;
}

.zhihuCard > div:nth-child(2) > div:nth-child(2) {
  display: flex;
}

.zhihuCard > div:nth-child(2) > div:nth-child(2) > button:nth-child(2) {
  margin-left: 5px;
}

button {
  height: 24px;
  line-height: 24px;
  font-size: 12px;
}
</style>
