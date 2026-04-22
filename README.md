# Telegram Mini App + TON Trading Demo

这是一个基于 **Next.js App Router**、**Telegram Mini App** 和 **TON Connect** 搭建的 demo 级项目。它模拟了一个“轻量交易产品”的核心体验：用户从 Telegram 打开 Mini App，完成 Telegram 身份校验，连接 TON 钱包，然后在移动端页面里完成 mock 下单、查看排行榜、查看邀请积分和账户信息。

这个项目的定位很明确：

- 它适合拿来做 **面试展示**
- 也适合拿来做 **Telegram Mini App + TON 接入入门学习**
- 它强调的是 **接入思路、模块拆分、状态设计和前端工程结构**
- 它不是生产级交易系统，当前很多业务逻辑仍然是 **mock / demo**

---

## 1. 项目简介

如果你是第一次接触 Telegram Mini App，可以把这个项目理解成：

“一个运行在 Telegram 里的 H5 应用，它既能识别 Telegram 用户身份，也能连接 TON 钱包，还用一套移动端 UI 模拟了交易类产品的基本页面结构。”

这个项目解决的不是“真实交易撮合”问题，而是下面这些更适合学习和展示的问题：

- Telegram 页面到底怎么接进来
- Telegram 的 `initData` 到底怎么读、怎么校验
- TON 钱包应该怎么接
- 一个移动端 demo 项目，怎么把页面、状态、API、模块拆清楚

它适合这些人：

- 想入门 Telegram Mini App 的前端开发者
- 想快速看懂 TON 钱包接入流程的 Web3 初学者
- 想做一个“可讲可演示”的面试项目的人
- 想学习“轻量但不乱”的前端项目结构设计的人

也要明确一点：

- 这是 **demo 级项目**
- 没有真实链上期权合约
- 没有真实订单撮合系统
- 排行榜、积分、价格、订单都是 mock 数据或 mock 流程

换句话说，它更像一个“真实产品的前端原型工程”，而不是一个已经上线的交易平台。

---

## 2. 你能在这个项目里学到什么

如果你把这个项目完整读一遍，至少可以学到下面这些东西：

- 如何让一个 Next.js 页面运行在 Telegram Mini App 容器里
- 如何在客户端读取 Telegram 的 launch params
- 如何拿到 `initDataRaw` 并发给服务端
- 如何在服务端用 bot token 校验 Telegram 身份
- 如何接入 TON Connect，让用户连接 TON 钱包
- 如何在页面里展示钱包地址、连接状态和交易按钮
- 如何组织一个移动端交易类页面，而不是把所有逻辑都堆进一个文件
- 如何把状态拆成 Telegram 身份态、钱包连接态、交易业务态、服务端数据态
- 如何用 React Query、Zustand、Zod 做一个轻量但有层次的 demo
- 如何把一个面试项目写成“能演示、能讲结构、能讲工程意识”的形式

如果你之前只写过普通 Web 页面，没有接过 Telegram 容器，没有做过钱包连接，这个项目是一个比较好的过渡案例。

---

## 3. 项目功能概览

当前 demo 包含这些主要功能模块：

- **Telegram 环境接入**
  客户端会尝试读取 Telegram launch params，并识别当前是否真的运行在 Telegram Mini App 里。

- **Telegram 用户身份校验**
  前端拿到 `initDataRaw` 后，会请求 `/api/telegram/auth`，由服务端完成 Telegram `initData` 校验。

- **TON 钱包连接**
  页面支持使用 `@tonconnect/ui-react` 连接 TON 钱包，并展示当前钱包地址与连接状态。

- **最小 TON 转账 demo**
  项目里封装了一个最小交易 payload 的构造逻辑，用来演示如何拉起钱包签名。

- **轻量交易面板（mock）**
  支持选择方向、输入金额、选择到期时间、查看 mock 价格、查看预估收益，并生成本地 mock 订单。

- **排行榜页面**
  通过 mock API 获取榜单数据，展示用户排名、收益、邀请人数、胜率。

- **邀请积分页面**
  展示邀请码、邀请人数、累计积分、积分规则，并支持复制邀请码。

- **个人中心 / 调试信息页**
  同时展示 Telegram 用户信息、TON 钱包地址、校验状态，以及当前调试数据，方便面试时演示。

---

## 4. 技术栈说明

这部分不是单纯列技术名词，而是解释“这个项目为什么需要它们”。

- **Next.js 16 App Router**
  负责整个项目的页面路由、布局管理和 API Route。你可以把它理解成这个项目的主框架，页面和接口都挂在它上面。

- **React 19**
  负责页面组件和交互逻辑。所有的 UI 都是 React 组件。

- **TypeScript**
  负责给页面、接口、状态、数据结构加类型，减少“数据明明长这样，代码却当成另一种结构用”的问题。

- **@tma.js/sdk / @tma.js/bridge / @tma.js/sdk-react**
  负责 Telegram Mini App 运行时接入。它们帮助前端读取 launch params、调用 Telegram 容器能力、识别当前是否在 Telegram 环境里。

- **@tma.js/init-data-node**
  负责在服务端校验 Telegram `initData`。这个步骤很重要，因为“前端自己说自己是谁”不可信，必须让服务端用 bot token 验证一遍。

- **@tonconnect/ui-react**
  负责 TON 钱包连接。它提供现成的钱包连接 UI 和发送交易的基础能力。

- **@ton/core**
  用来构造 TON 交易相关的数据结构，比如 demo 里的最小 payload。

- **Ant Design Mobile**
  作为移动端组件库，负责按钮、列表、Tag、Selector、Input、TabBar 等 UI 组件，让页面更像手机上的交易产品，而不是 PC 后台。

- **Tailwind CSS**
  负责布局和视觉增强。项目里不是用 Tailwind 替代组件库，而是让它补足样式控制和页面氛围。

- **React Query**
  负责获取和缓存服务端数据，比如排行榜、奖励信息、价格数据、Telegram auth 查询结果。它适合管理“来自服务端的数据”。

- **Zustand**
  负责管理本地业务状态，比如交易表单和本地 mock 订单列表。它适合管理“页面里会频繁改动的本地状态”。

- **Zod**
  负责表单和接口数据结构校验。比如下单金额是否合法、接口入参结构是否完整，这些都可以通过 Zod 明确约束。

- **clsx + tailwind-merge**
  负责更干净地组织类名，避免一堆字符串拼接让样式逻辑变得难读。

---

## 5. 项目整体实现思路

这一节最重要。你可以把整个项目理解成一条从“用户打开页面”到“页面展示业务内容”的链路。

### 第 1 步：用户从 Telegram 打开 Mini App

用户不是直接访问一个普通网页，而是从 Telegram 里的 Bot 或 Mini App 入口打开这个项目。

如果打开方式正确，Telegram 会把一组运行时参数带进来，这里面就包括：

- 当前用户的一些身份信息
- 启动参数
- `initDataRaw`

前端在 [`src/features/telegram/components/telegram-runtime-provider.tsx`](./src/features/telegram/components/telegram-runtime-provider.tsx) 里读取这些参数，并把它们放进 Telegram 运行时上下文里。

如果不是从 Telegram 打开，而是直接在普通浏览器访问：

- 读取 launch params 会失败
- 页面会进入 fallback 模式
- 你仍然可以看页面结构，但拿不到真实 Telegram 用户态

这也是 README 后面 FAQ 会反复强调的一点。

### 第 2 步：前端读取 `initDataRaw`

拿到 Telegram launch params 之后，前端会关心两个问题：

1. 我是不是运行在 Telegram Mini App 环境里
2. 我有没有拿到 `initDataRaw`

`initDataRaw` 很关键，因为它是服务端校验 Telegram 身份的原始材料。

项目里通过：

- `TelegramRuntimeProvider` 统一保存运行时信息
- `useTelegramAuth` 发起身份校验请求

这样页面组件不需要自己关心“参数怎么读”，只需要拿已经整理好的状态。

### 第 3 步：前端把 `initDataRaw` 发给服务端

客户端并不会自己判断“这个 Telegram 用户是真的还是假的”，因为前端是不可信环境。

所以在 [`src/features/telegram/hooks/use-telegram-auth.ts`](./src/features/telegram/hooks/use-telegram-auth.ts) 里，前端会调用：

- `/api/telegram/auth`

把 `initDataRaw` 发送给服务端。

### 第 4 步：服务端用 bot token 校验 Telegram 身份

服务端路由在：

- [`src/app/api/telegram/auth/route.ts`](./src/app/api/telegram/auth/route.ts)

它会做几件事：

1. 用 Zod 校验请求体结构
2. 读取 `TELEGRAM_BOT_TOKEN`
3. 如果 bot token 已配置，就使用 `@tma.js/init-data-node` 校验 `initDataRaw`
4. 把解析后的用户信息返回给前端

这里要理解一个核心点：

- **前端读取参数**，只是“拿到信息”
- **服务端校验参数**，才是“确认身份”

如果没有配置 `TELEGRAM_BOT_TOKEN`，当前 demo 会退化为“只解析，不强校验”的展示模式，方便本地预览，但这不等于真实安全校验。

### 第 5 步：前端接入 TON Connect，让用户连接钱包

在 Provider 层：

- [`src/components/providers.tsx`](./src/components/providers.tsx)

项目初始化了 `TonConnectUIProvider`，这样所有页面都能访问钱包连接上下文。

然后在 Wallet 模块里：

- [`src/features/wallet/components/wallet-summary-card.tsx`](./src/features/wallet/components/wallet-summary-card.tsx)
- [`src/features/wallet/hooks/use-wallet-actions.ts`](./src/features/wallet/hooks/use-wallet-actions.ts)

页面可以展示：

- Connect Wallet 按钮
- 当前钱包地址
- 钱包是否已连接
- 一个最小 demo 转账按钮

注意，钱包连接成功不代表 Telegram 身份已经校验成功。它们是两条不同的状态链路，这一点后面会专门讲。

### 第 6 步：页面把“身份态 + 钱包态 + 业务模块”组合起来

项目首页和其他页面不是一个超大组件，而是通过不同 feature 组合起来：

- 首页：展示项目概览、用户状态、钱包状态
- Trade：展示交易面板和本地订单流
- Leaderboard：展示榜单数据
- Rewards：展示奖励数据
- Profile：展示调试信息和账户信息

路由入口在：

- [`src/app/page.tsx`](./src/app/page.tsx)
- [`src/app/trade/page.tsx`](./src/app/trade/page.tsx)
- [`src/app/leaderboard/page.tsx`](./src/app/leaderboard/page.tsx)
- [`src/app/rewards/page.tsx`](./src/app/rewards/page.tsx)
- [`src/app/profile/page.tsx`](./src/app/profile/page.tsx)

这些页面本身都比较薄，真正的逻辑在 `features/*` 里。

### 第 7 步：交易面板是 mock，但结构模拟真实产品

Trade 模块虽然没有真实链上期权下单，但结构尽量按照真实项目拆分：

- schema：约束表单结构
- store：保存本地表单态和订单态
- service：负责 mock 下单逻辑和收益计算
- hooks：把 UI 需要的数据和动作整理好
- components：负责渲染 UI

这样做的意义不是“为了拆而拆”，而是让你在面试时可以讲：

- 我知道哪些状态应该放 store
- 我知道校验逻辑不该写在页面组件里
- 我知道 demo 也应该按真实项目的模块边界来组织

### 第 8 步：排行榜和邀请模块走 mock API + Query

排行榜、奖励和价格数据都不是直接写死在组件里的，而是走 API Route：

- [`src/app/api/leaderboard/route.ts`](./src/app/api/leaderboard/route.ts)
- [`src/app/api/rewards/route.ts`](./src/app/api/rewards/route.ts)
- [`src/app/api/price/route.ts`](./src/app/api/price/route.ts)

然后前端通过 React Query 获取这些数据。

这样做的好处是：

- 页面组件更像在请求真实接口
- 后面如果把 mock API 替换成真实后端，前端结构不用大改
- 新手可以学到“组件不一定要直接写假数据”

---

## 6. 状态是怎么分层的

这个项目里至少有四类状态，它们不能混成一个总状态对象，否则后面一定会乱。

### 1. Telegram 身份态

它描述的是：

- 当前是不是 Telegram 环境
- 有没有拿到 `initDataRaw`
- 服务端校验是否通过
- 当前 Telegram 用户是谁

这部分状态的重点是“身份和容器环境”，不是交易业务。

### 2. 钱包连接态

它描述的是：

- 用户是否连接了 TON 钱包
- 钱包地址是什么
- 当前钱包 App 是什么
- 钱包签名 / 发送交易是否正在处理中

这部分状态来自 TON Connect，不属于 Telegram Auth，也不属于下单表单。

### 3. 业务交易态

它描述的是：

- 当前选择的是 UP 还是 DOWN
- 输入了多少金额
- 选择了哪个到期时间
- 最近创建了哪些本地 mock 订单

这部分状态和“业务交互”有关，适合放到 Zustand 里。

### 4. 服务端 mock 数据态

它描述的是：

- 当前价格是多少
- 排行榜接口返回了什么
- 奖励接口返回了什么

这些数据更像“服务端资源”，适合交给 React Query 管理。

### 为什么不能把这些状态混在一起

因为它们的来源、更新频率和生命周期完全不同。

举个最简单的例子：

- Telegram 身份态通常在进入页面时确认一次
- 钱包态由钱包连接流程驱动
- 下单表单态会随着用户输入频繁变化
- 榜单和积分数据来自服务端请求，有缓存和刷新节奏

如果把它们全放进一个大 store：

- 代码会越来越难读
- 更新逻辑会互相干扰
- 后面你根本说不清“哪部分状态是业务态，哪部分是外部连接态”

这个项目刻意把这些状态拆开，就是为了让新手能看懂“状态分层”到底是什么意思。

---

## 7. 项目目录结构怎么读

很多新手第一次看项目时，喜欢先从目录树开始，但更重要的是“按什么顺序看”。

推荐这样读：

### 第一步：先看应用入口和 Provider

先看：

- [`src/app/layout.tsx`](./src/app/layout.tsx)
- [`src/components/providers.tsx`](./src/components/providers.tsx)
- [`src/components/app-shell.tsx`](./src/components/app-shell.tsx)
- [`src/components/bottom-tab-bar.tsx`](./src/components/bottom-tab-bar.tsx)

原因很简单：

- 你要先知道整个页面是怎么包起来的
- 你要先知道 Query、TON Connect、Telegram Runtime 是在哪里初始化的
- 你要先知道底部导航是怎么组织页面的

如果一上来就扎进 Trade 组件，很容易只见局部，不知道项目整体怎么运转。

### 第二步：再看首页怎么挂业务模块

看：

- [`src/app/page.tsx`](./src/app/page.tsx)
- [`src/components/home-dashboard.tsx`](./src/components/home-dashboard.tsx)

原因是首页最适合快速理解项目“都有哪些模块”，它把 Telegram 状态、钱包状态和入口功能组合在一起，信息密度最高。

### 第三步：看 Telegram 模块

看：

- [`src/features/telegram/components/telegram-runtime-provider.tsx`](./src/features/telegram/components/telegram-runtime-provider.tsx)
- [`src/features/telegram/hooks/use-telegram-auth.ts`](./src/features/telegram/hooks/use-telegram-auth.ts)
- [`src/features/telegram/services/telegram-auth.ts`](./src/features/telegram/services/telegram-auth.ts)
- [`src/app/api/telegram/auth/route.ts`](./src/app/api/telegram/auth/route.ts)

原因是 Telegram 身份链路是这个项目最有辨识度的部分，也是最适合面试讲的部分。

### 第四步：看 Wallet 模块

看：

- [`src/features/wallet/components/wallet-summary-card.tsx`](./src/features/wallet/components/wallet-summary-card.tsx)
- [`src/features/wallet/hooks/use-wallet-actions.ts`](./src/features/wallet/hooks/use-wallet-actions.ts)
- [`src/features/wallet/services/ton-transactions.ts`](./src/features/wallet/services/ton-transactions.ts)

原因是你要知道这个项目怎么和 TON 钱包建立联系。

### 第五步：看 Trade 模块

看：

- [`src/features/trade/components/trade-panel.tsx`](./src/features/trade/components/trade-panel.tsx)
- [`src/features/trade/components/order-history.tsx`](./src/features/trade/components/order-history.tsx)
- [`src/features/trade/hooks/use-trade-panel.ts`](./src/features/trade/hooks/use-trade-panel.ts)
- [`src/features/trade/services/trade-service.ts`](./src/features/trade/services/trade-service.ts)
- [`src/stores/trade-store.ts`](./src/stores/trade-store.ts)
- [`src/schemas/trade.ts`](./src/schemas/trade.ts)

原因是这个模块最能体现“组件、hook、service、schema、store 分层”。

### 第六步：最后看 Leaderboard / Rewards / Profile

看：

- [`src/features/leaderboard`](./src/features/leaderboard)
- [`src/features/rewards`](./src/features/rewards)
- [`src/features/profile`](./src/features/profile)

这些模块相对直观，适合在你已经理解整体架构之后再看。

### 当前目录树

```text
src/
  app/
    api/
      leaderboard/
      price/
      rewards/
      telegram/auth/
    leaderboard/
    profile/
    rewards/
    trade/
    globals.css
    layout.tsx
    page.tsx
  components/
    app-shell.tsx
    bottom-tab-bar.tsx
    home-dashboard.tsx
    providers.tsx
  features/
    telegram/
    wallet/
    trade/
    leaderboard/
    rewards/
    profile/
  lib/
  mocks/
  schemas/
  stores/
  types/
```

另外，项目根目录的 `app/` 是为了兼容 Next.js 16 和当前开发环境的入口层，真正业务实现仍然以 `src/app/` 和 `src/features/` 为主。

---

## 8. 核心模块说明

这一节适合你边读源码边理解，也适合你准备面试时整理讲法。

### Telegram 模块

#### 这个模块是干什么的

负责识别 Telegram Mini App 运行时、读取 launch params、拿到 `initDataRaw`，并发给服务端进行身份校验。

#### 它依赖哪些核心文件

- [`src/features/telegram/components/telegram-runtime-provider.tsx`](./src/features/telegram/components/telegram-runtime-provider.tsx)
- [`src/features/telegram/hooks/use-telegram-auth.ts`](./src/features/telegram/hooks/use-telegram-auth.ts)
- [`src/features/telegram/services/telegram-auth.ts`](./src/features/telegram/services/telegram-auth.ts)
- [`src/features/telegram/components/telegram-status-banner.tsx`](./src/features/telegram/components/telegram-status-banner.tsx)
- [`src/app/api/telegram/auth/route.ts`](./src/app/api/telegram/auth/route.ts)
- [`src/schemas/telegram.ts`](./src/schemas/telegram.ts)

#### 面试时可以怎么讲

你可以说：

“这个 demo 的一个重点是 Telegram 身份链路。我把 Telegram 运行时读取和服务端 auth 校验拆成了两个层次：客户端负责读取 launch params 和 initDataRaw，服务端负责用 bot token 校验 Telegram 身份。这样既能演示容器接入，也能讲清楚为什么前端自己判断身份是不够的。”

### Wallet 模块

#### 这个模块是干什么的

负责 TON 钱包连接、地址展示和最小交易签名 demo。

#### 它依赖哪些核心文件

- [`src/components/providers.tsx`](./src/components/providers.tsx)
- [`src/features/wallet/components/wallet-summary-card.tsx`](./src/features/wallet/components/wallet-summary-card.tsx)
- [`src/features/wallet/hooks/use-wallet-actions.ts`](./src/features/wallet/hooks/use-wallet-actions.ts)
- [`src/features/wallet/services/ton-transactions.ts`](./src/features/wallet/services/ton-transactions.ts)
- [`public/tonconnect-manifest.json`](./public/tonconnect-manifest.json)

#### 面试时可以怎么讲

你可以说：

“钱包这块我用的是 TonConnect，Provider 层统一注入，业务组件只拿钱包状态和动作。为了避免把交易构造逻辑堆在页面里，我把最小 TON 转账 payload 独立放到了 service 层，后面如果替换成真实合约交互，也有清晰的扩展点。”

### Trade 模块

#### 这个模块是干什么的

负责轻量交易面板，包括方向选择、金额输入、到期时间、预估收益、提交下单和本地 mock 订单展示。

#### 它依赖哪些核心文件

- [`src/features/trade/components/trade-panel.tsx`](./src/features/trade/components/trade-panel.tsx)
- [`src/features/trade/components/order-history.tsx`](./src/features/trade/components/order-history.tsx)
- [`src/features/trade/hooks/use-trade-panel.ts`](./src/features/trade/hooks/use-trade-panel.ts)
- [`src/features/trade/hooks/use-trade-quote.ts`](./src/features/trade/hooks/use-trade-quote.ts)
- [`src/features/trade/services/trade-service.ts`](./src/features/trade/services/trade-service.ts)
- [`src/stores/trade-store.ts`](./src/stores/trade-store.ts)
- [`src/schemas/trade.ts`](./src/schemas/trade.ts)

#### 面试时可以怎么讲

你可以说：

“交易模块虽然是 mock，但我故意按真实产品结构拆了 schema、hook、store、service 和组件。这样可以体现我不仅会把页面做出来，也会考虑业务边界、表单校验和后续扩展性。”

### Leaderboard 模块

#### 这个模块是干什么的

负责展示用户排行榜数据。

#### 它依赖哪些核心文件

- [`src/features/leaderboard/components/leaderboard-list.tsx`](./src/features/leaderboard/components/leaderboard-list.tsx)
- [`src/features/leaderboard/hooks/use-leaderboard-query.ts`](./src/features/leaderboard/hooks/use-leaderboard-query.ts)
- [`src/app/api/leaderboard/route.ts`](./src/app/api/leaderboard/route.ts)
- [`src/mocks/leaderboard.ts`](./src/mocks/leaderboard.ts)

#### 面试时可以怎么讲

你可以说：

“排行榜是一个典型的服务端资源型模块，所以我用 React Query 管，而不是塞到 Zustand。这样数据来源和业务本地态是分开的，结构会更清晰。”

### Rewards 模块

#### 这个模块是干什么的

负责展示邀请码、邀请人数、累计积分和积分规则。

#### 它依赖哪些核心文件

- [`src/features/rewards/components/rewards-panel.tsx`](./src/features/rewards/components/rewards-panel.tsx)
- [`src/features/rewards/hooks/use-rewards-query.ts`](./src/features/rewards/hooks/use-rewards-query.ts)
- [`src/app/api/rewards/route.ts`](./src/app/api/rewards/route.ts)
- [`src/mocks/rewards.ts`](./src/mocks/rewards.ts)

#### 面试时可以怎么讲

你可以说：

“奖励模块的重点不在复杂算法，而在于增长功能的完整链路展示。我保留了 API、Query、UI 和复制邀请码交互，让它看起来更像真实产品中的增长页面。”

### Profile 模块

#### 这个模块是干什么的

负责统一展示账户信息和调试信息，方便在演示时把 Telegram 状态、钱包状态和接口结果放在一个页面里讲清楚。

#### 它依赖哪些核心文件

- [`src/features/profile/components/profile-overview.tsx`](./src/features/profile/components/profile-overview.tsx)
- [`src/features/telegram/hooks/use-telegram-auth.ts`](./src/features/telegram/hooks/use-telegram-auth.ts)
- [`src/features/wallet/hooks/use-wallet-actions.ts`](./src/features/wallet/hooks/use-wallet-actions.ts)

#### 面试时可以怎么讲

你可以说：

“Profile 页我故意加了调试信息区，不只是为了开发方便，也是为了面试展示时能快速说明 launch params、auth result 和 wallet status 是怎么串起来的。”

---

## 9. 本地运行方式

这一节按“第一次接 Telegram Mini App 的人”来写。

### 1. 安装依赖

```bash
npm install
```

### 2. 配置 `.env.local`

在项目根目录创建 `.env.local`：

```bash
touch .env.local
```

写入下面两个环境变量：

```env
NEXT_PUBLIC_APP_URL=https://your-ngrok-domain.ngrok-free.app
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
```

说明：

- `NEXT_PUBLIC_APP_URL` 是你的公网地址，TonConnect manifest 和 Telegram Mini App 都会用到它
- `TELEGRAM_BOT_TOKEN` 是你的 Telegram Bot token，用于服务端校验 `initData`

不要把真实 token 提交到仓库里。

### 3. 启动本地开发

```bash
npm run dev
```

默认本地地址：

```text
http://localhost:3000
```

### 4. 使用 ngrok 暴露公网地址

因为 Telegram 需要公网可访问地址，所以本地开发一般会配合 ngrok。

例如：

```bash
ngrok http 3000
```

ngrok 会给你一个公网地址，例如：

```text
https://your-demo.ngrok-free.app
```

然后把这个地址填回 `.env.local`：

```env
NEXT_PUBLIC_APP_URL=https://your-demo.ngrok-free.app
```

如果地址变了，记得重启 `npm run dev`。

### 5. 配置 TonConnect Manifest

项目已经有：

- [`public/tonconnect-manifest.json`](./public/tonconnect-manifest.json)

你需要把里面的 `url` 和 `iconUrl` 改成当前可访问的公网地址。

例如：

```json
{
  "url": "https://your-demo.ngrok-free.app",
  "name": "Telegram Mini App | TON Options Demo",
  "iconUrl": "https://your-demo.ngrok-free.app/favicon.ico"
}
```

### 6. 在 Telegram / BotFather 中配置 Mini App

大致流程如下：

1. 在 Telegram 中找到 `@BotFather`
2. 创建一个 bot，拿到 bot token
3. 使用 BotFather 的 Mini App / Web App 相关配置命令
4. 把你的 ngrok 公网地址配置成 Web App 地址
5. 从 Telegram 里点击 bot 的 Mini App 按钮进入页面

不同时间 Telegram 的配置界面可能会略有变化，但核心思路不变：**让 Telegram 用公网地址打开你的应用。**

### 7. 如何验证 Telegram 身份链路是否生效

你可以这样判断：

- 如果你是在普通浏览器里直接打开页面，页面会显示 fallback 提示
- 如果你是从 Telegram 打开，并且 `TELEGRAM_BOT_TOKEN` 配置正确，Profile 或首页会显示 auth verified
- 你还可以看：
  - [`/profile`](http://localhost:3000/profile) 页面中的调试信息区
  - Network 面板里 `/api/telegram/auth` 的响应结果

如果接口返回：

- `verified: true`

说明服务端校验链路已经生效。

---

## 10. 常见问题 / 踩坑说明

### Q1：为什么 `retrieveLaunchParams` 会报错？

最常见原因是：你不是从 Telegram Mini App 容器里打开的。

在普通浏览器里直接访问项目，Telegram runtime 参数不存在，所以读取 launch params 会失败。这是正常现象，不是代码一定坏了。

### Q2：为什么普通浏览器里拿不到 `initDataRaw`？

因为 `initDataRaw` 是 Telegram 容器在打开 Mini App 时注入的。普通浏览器本身不知道你是哪个 Telegram 用户，自然拿不到这份数据。

### Q3：为什么需要 ngrok？

因为 Telegram 需要访问一个公网地址来加载你的 Mini App。本地的 `localhost:3000` 只能你自己电脑访问，Telegram 服务器和手机端访问不到。

### Q4：为什么 `next dev` 需要配置 `allowedDevOrigins`？

Next.js 16 在开发模式下会对 dev 请求来源做限制。Telegram 或 ngrok 这种跨源访问开发服务器时，可能被拦住，所以需要在 `next.config.ts` 里配置 `allowedDevOrigins`。

当前项目已经在：

- [`next.config.ts`](./next.config.ts)

里做了这部分配置。

### Q5：为什么钱包连接成功，不等于 Telegram 身份校验成功？

因为它们是两套完全不同的链路。

- Telegram 身份校验解决的是“你是不是 Telegram 用户、是不是这个用户”
- TON 钱包连接解决的是“你有没有连接一个 TON 钱包”

一个用户完全可能：

- 已经连接钱包，但不是从 Telegram 打开的
- 已经通过 Telegram 身份校验，但还没有连接钱包

### Q6：为什么这个项目里很多功能还是 mock？

因为这个项目的目标不是上线真实交易系统，而是演示：

- Telegram 容器接入
- 钱包接入
- 移动端交易页面组织方式
- 状态分层和模块拆分

真实的链上交易、订单撮合、风控、资产结算都远比这个 demo 复杂得多。

### Q7：为什么我改了 ngrok 地址后钱包连接异常？

很可能是下面这几个地方没有同步更新：

- `.env.local` 里的 `NEXT_PUBLIC_APP_URL`
- `public/tonconnect-manifest.json` 里的 `url`
- `public/tonconnect-manifest.json` 里的 `iconUrl`

这些地址不一致时，TonConnect 很容易出问题。

### Q8：为什么项目里同时有根级 `app/` 和 `src/app/`？

这是当前项目为了兼容 Next.js 16 和本地开发工具链做的入口适配。

- 主要业务代码写在 `src/app/` 和 `src/features/`
- 根级 `app/` 主要是 Next 的入口层转发

你读源码时，优先看 `src/`。

---

## 11. 面试时如何介绍这个项目

这一节是给你“拿来就能说”的。

### 1 分钟项目介绍话术

你可以这样说：

> 这是一个基于 Next.js、Telegram Mini App 和 TON Connect 做的轻量交易产品 demo。项目的重点不是实现真实交易撮合，而是把 Telegram 容器接入、服务端 initData 校验、TON 钱包连接、移动端交易界面和轻量状态管理整合到一个可演示的工程里。  
> 在实现上，我把 Telegram 身份态、钱包连接态、业务交易态和服务端数据态拆开管理。页面结构上按 feature 做了模块拆分，比如 telegram、wallet、trade、leaderboard、rewards、profile。这样既方便新手阅读，也方便我在面试里讲模块边界和前后端联调思路。

### 技术亮点总结

- 使用 `@tma.js` 完成 Telegram Mini App 运行时接入
- 使用 `@tma.js/init-data-node` 做服务端 Telegram 身份校验
- 使用 `@tonconnect/ui-react` 完成 TON 钱包接入和签名演示
- 使用 `React Query + Zustand + Zod` 做轻量但分层清晰的状态设计
- 使用 `Ant Design Mobile + Tailwind CSS` 做移动端产品化 UI
- 用 feature 分层而不是把逻辑塞进 `page.tsx`
- 用 mock API 保持前端结构接近真实产品

### 面试中可能被追问的问题方向

- Telegram `initData` 为什么必须服务端校验
- 钱包连接态和 Telegram 身份态为什么要分开
- React Query 和 Zustand 的边界怎么划分
- 如果要接真实链上合约，现有结构怎么扩展
- 为什么用 mock API，而不是直接在组件里写假数据
- 如果做生产级版本，需要补哪些安全和架构能力

---

## 12. 后续可以怎么扩展

如果以后你想把这个 demo 往更真实的方向推进，可以从这些方向扩展：

### 1. 真实订单系统

现在订单是本地 mock。后续可以接入真实后端，支持：

- 订单创建
- 订单状态流转
- 历史订单查询
- 交易记录持久化

### 2. 真实链上交互

现在只有最小钱包签名 demo。后续可以：

- 设计真实合约调用 payload
- 发起真实链上交易
- 处理交易结果和回执

### 3. 用户资产页

加入：

- 钱包余额
- 持仓信息
- 收益明细
- 交易历史

这样会更像完整产品。

### 4. 实时行情

当前价格来自 mock API。后续可以接：

- 实时行情源
- WebSocket 推送
- 更完整的价格图表

### 5. 邀请关系链上化或后端化

现在邀请积分是 mock 数据。后续可以扩展为：

- 真实邀请绑定
- 邀请记录持久化
- 积分规则配置化

### 6. 更完整的安全校验

生产级系统至少还要考虑：

- 服务端 session 管理
- 请求防重放
- 钱包签名与 Telegram 身份绑定
- 风控与限流
- 更严格的接口鉴权

---

## 补充说明

### 这是一个 demo，不是生产系统

再次强调，这个项目当前最有价值的地方在于：

- 结构清楚
- 接入链路完整
- 页面可演示
- 状态分层合理

而不是“真实交易能力已经做完”。

### 推荐的阅读方式

如果你时间不多，建议按下面顺序读：

1. [`src/app/layout.tsx`](./src/app/layout.tsx)
2. [`src/components/providers.tsx`](./src/components/providers.tsx)
3. [`src/components/home-dashboard.tsx`](./src/components/home-dashboard.tsx)
4. [`src/features/telegram`](./src/features/telegram)
5. [`src/features/wallet`](./src/features/wallet)
6. [`src/features/trade`](./src/features/trade)
7. [`src/app/api`](./src/app/api)
8. [`src/features/leaderboard`](./src/features/leaderboard)、[`src/features/rewards`](./src/features/rewards)、[`src/features/profile`](./src/features/profile)

如果你是为了准备面试，建议优先把这三条线讲顺：

- Telegram 身份链路
- TON 钱包链路
- 状态分层与模块拆分
