<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Co-Fo CVI 可视化风格看板 (V1.0)</title>
    <!-- Load Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Load Inter font family and CJK fallback fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <style>
        /* 严格应用 CVI 字体规范 (cvi-specification-v1.txt, 3.2) */
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 
                         'PingFang SC', 'Noto Sans SC', 
                         'Microsoft YaHei', 'Helvetica Neue', 
                         Helvetica, Arial, sans-serif;
        }

        /* --- CVI 色彩变量 --- */
        :root {
            /* V1 (Dark Mode) 基调 (cvi-specification-v1.txt, 2.1) */
            --cvi-dark-bg: #171717;
            --cvi-dark-container: #262626;
            --cvi-dark-wireframe: #525252;
            --cvi-dark-text: #F5F5F5;

            /* V2 (Light Mode) 基调 (cvi-specification-v1.txt, 2.2) */
            --cvi-light-bg: #FFFFFF;
            --cvi-light-container: #F9FAFB;
            --cvi-light-wireframe: #9CA3AF;
            --cvi-light-text: #1F2937;

            /* 灵动点缀色 (cvi-specification-v1.txt, 2.3) */
            --cvi-blue: #3B82F6;
            --cvi-green: #10B981;
            --cvi-gold: #F59E0B;
            --cvi-indigo: #6366F1;
        }

        /* --- AI 渐变与动画 (cvi-specification-v1.txt, 2.4 & 5.4) --- */
        
        /* 动态渐变 (文本和实心填充) */
        .ai-gradient-text, .ai-gradient-fill {
            background-image: linear-gradient(90deg, var(--cvi-blue), var(--cvi-green), var(--cvi-gold), var(--cvi-indigo));
            background-size: 200% 200%;
            animation: gradient-flow 4s ease infinite; /* 保持流动动画 */
        }
        
        /* 1. 文本渐变 (Hollow) */
        .ai-gradient-text {
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }

        /* 3. 实心渐变 (Solid) */
        .ai-gradient-fill {
            /* 直接应用渐变作为背景填充，实现实心效果 */
            border: none;
        }

        /* 2. 边框渐变 (Hollow/Flowing) - 保持静态 */
        .ai-gradient-border {
            border: 2px solid transparent; /* 设置 2px 边框厚度 */
            background-clip: padding-box, border-box;
            background-origin: padding-box, border-box;
            
            /* 保持静态渐变效果 */
            background-size: 200% 200%;
            background-position: 0% 50%;
            
            /* Light mode background: Inner color + Gradient */
            background-image: linear-gradient(to right, var(--cvi-light-container), var(--cvi-light-container)), 
                              linear-gradient(90deg, var(--cvi-blue), var(--cvi-green), var(--cvi-gold), var(--cvi-indigo));
        }
        .dark .ai-gradient-border {
             /* Dark mode background: Inner color + Gradient */
             background-image: linear-gradient(to right, var(--cvi-dark-container), var(--cvi-dark-container)), 
                               linear-gradient(90deg, var(--cvi-blue), var(--cvi-green), var(--cvi-gold), var(--cvi-indigo));
        }

        /* 渐变流动关键帧 (用于 Nudge 图标) */
        @keyframes gradient-flow {
            0% { background-position: 0% 50% }
            50% { background-position: 100% 50% }
            100% { background-position: 0% 50% }
        }
        
        /* Nudge 提示和 AI 对话栏共用的脉动阴影 (用于 Light Mode 下 Nudge 容器的边框) */
        .pulse-shadow {
            /* 移除 Tailwind 默认的 box-shadow，专注于光晕效果 */
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); 
            animation: pulse-border 2s infinite;
        }
        @keyframes pulse-border {
            0% {
                /* 脉冲开始：蓝色光晕 70% 透明度 */
                box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
            }
            70% {
                /* 脉冲峰值：扩散到 10px，透明度降至 0 */
                box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
            }
            100% {
                /* 脉冲结束：回到 0 */
                box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
            }
        }
    </style>
    
    <!-- 
      Tailwind Config (内联) 
      用于扩展 CVI 规范中定义的精确色号
    -->
    <script>
        tailwind.config = {
            darkMode: 'class', // 启用 Dark Mode
            theme: {
                extend: {
                    colors: {
                        // V1 Dark Mode
                        'dark-bg': 'var(--cvi-dark-bg)',
                        'dark-container': 'var(--cvi-dark-container)',
                        'dark-wireframe': 'var(--cvi-dark-wireframe)',
                        'dark-text': 'var(--cvi-dark-text)',
                        // V2 Light Mode
                        'light-bg': 'var(--cvi-light-bg)',
                        'light-container': 'var(--cvi-light-container)',
                        'light-wireframe': 'var(--cvi-light-wireframe)',
                        'light-text': 'var(--cvi-light-text)',
                        // 灵动点缀色 (Co-Fo 缩写为 cofi)
                        'cofi-blue': 'var(--cvi-blue)',
                        'cofi-green': 'var(--cvi-green)',
                        'cofi-gold': 'var(--cvi-gold)',
                        'cofi-indigo': 'var(--cvi-indigo)',
                    }
                }
            }
        }
    </script>
</head>

<!-- Body 默认使用 Light Mode V2 样式 -->
<body class="bg-light-bg dark:bg-dark-bg transition-colors duration-300">

    <div class="container mx-auto p-6 md:p-10 max-w-7xl">

        <!-- 1. 标题 -->
        <header class="text-center mb-12">
            <h1 class="text-4xl md:text-5xl font-bold text-light-text dark:text-dark-text mb-4">Co-Fo CVI 风格看板</h1>
            <p class="text-xl text-light-wireframe dark:text-dark-wireframe">
                AI 联合创始人的陪伴系统风格可视化
            </p>
        </header>

        <!-- 2. 品牌色谱 (Color Palette) -->
        <section class="mb-12">
            <h2 class="text-3xl font-semibold text-light-text dark:text-dark-text border-b border-light-container dark:border-dark-container pb-3 mb-6">
                2. 品牌色谱
            </h2>
            
            <!-- 灵动点缀色 -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <!-- CoFo-Blue -->
                <div class="text-center">
                    <div class="h-24 w-full rounded-lg bg-cofi-blue shadow-md"></div>
                    <div class="mt-2 text-sm font-medium text-light-text dark:text-dark-text">CoFo-Blue</div>
                    <div class="text-xs text-light-wireframe dark:text-dark-wireframe">#3B82F6</div>
                </div>
                <!-- CoFo-Green -->
                <div class="text-center">
                    <div class="h-24 w-full rounded-lg bg-cofi-green shadow-md"></div>
                    <div class="mt-2 text-sm font-medium text-light-text dark:text-dark-text">CoFo-Green</div>
                    <div class="text-xs text-light-wireframe dark:text-dark-wireframe">#10B981</div>
                </div>
                <!-- CoFo-Gold -->
                <div class="text-center">
                    <div class="h-24 w-full rounded-lg bg-cofi-gold shadow-md"></div>
                    <div class="mt-2 text-sm font-medium text-light-text dark:text-dark-text">CoFo-Gold</div>
                    <div class="text-xs text-light-wireframe dark:text-dark-wireframe">#F59E0B</div>
                </div>
                <!-- CoFo-Indigo -->
                <div class="text-center">
                    <div class="h-24 w-full rounded-lg bg-cofi-indigo shadow-md"></div>
                    <div class="mt-2 text-sm font-medium text-light-text dark:text-dark-text">CoFo-Indigo</div>
                    <div class="text-xs text-light-wireframe dark:text-dark-wireframe">#6366F1</div>
                </div>
            </div>

            <!-- 专业基调 (V1 Dark & V2 Light) -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- V2 Light Mode 基调 -->
                <div>
                    <h3 class="text-lg font-semibold text-light-text dark:text-dark-text mb-3">V2 (Light Mode) 基调</h3>
                    <div class="grid grid-cols-2 gap-3">
                        <!-- Background -->
                        <div class="rounded-lg p-4 border border-gray-200" style="background-color: var(--cvi-light-bg);">
                            <div class="font-bold text-light-text">Background</div>
                            <div class="text-sm text-light-wireframe">#FFFFFF</div>
                        </div>
                        <!-- Container -->
                        <div class="rounded-lg p-4" style="background-color: var(--cvi-light-container);">
                            <div class="font-bold text-light-text">Container</div>
                            <div class="text-sm text-light-wireframe">#F9FAFB</div>
                        </div>
                        <!-- Wireframe -->
                        <div class="rounded-lg p-4" style="background-color: var(--cvi-light-container);">
                            <div class="font-bold" style="color: var(--cvi-light-wireframe);">Wireframe</div>
                            <div class="text-sm text-light-wireframe">#9CA3AF</div>
                        </div>
                        <!-- Text -->
                        <div class="rounded-lg p-4" style="background-color: var(--cvi-light-container);">
                            <div class="font-bold" style="color: var(--cvi-light-text);">Text</div>
                            <div class="text-sm text-light-wireframe">#1F2937</div>
                        </div>
                    </div>
                </div>
                <!-- V1 Dark Mode 基调 -->
                <div>
                    <h3 class="text-lg font-semibold text-light-text dark:text-dark-text mb-3">V1 (Dark Mode) 基调</h3>
                    <div class="grid grid-cols-2 gap-3">
                        <!-- Background -->
                        <div class="rounded-lg p-4" style="background-color: var(--cvi-dark-bg);">
                            <div class="font-bold text-dark-text">Background</div>
                            <div class="text-sm text-dark-wireframe">#171717</div>
                        </div>
                        <!-- Container -->
                        <div class="rounded-lg p-4" style="background-color: var(--cvi-dark-container);">
                            <div class="font-bold text-dark-text">Container</div>
                            <div class="text-sm text-dark-wireframe">#262626</div>
                        </div>
                        <!-- Wireframe -->
                        <div class="rounded-lg p-4" style="background-color: var(--cvi-dark-container);">
                            <div class="font-bold" style="color: var(--cvi-dark-wireframe);">Wireframe</div>
                            <div class="text-sm text-dark-wireframe">#525252</div>
                        </div>
                        <!-- Text -->
                        <div class="rounded-lg p-4" style="background-color: var(--cvi-dark-container);">
                            <div class="font-bold" style="color: var(--cvi-dark-text);">Text</div>
                            <div class="text-sm text-dark-wireframe">#F5F5F5</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 3. 字体系统 (Typography) -->
        <section class="mb-12">
            <h2 class="text-3xl font-semibold text-light-text dark:text-dark-text border-b border-light-container dark:border-dark-container pb-3 mb-6">
                3. 字体系统
            </h2>
            <div class="bg-light-container dark:bg-dark-container rounded-lg p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- V2 Light Mode 字体应用 -->
                    <div>
                        <div class="mb-4">
                            <div class="text-xs text-cofi-blue font-semibold mb-1">V2 (LIGHT MODE) 应用</div>
                            <div class="text-4xl text-light-text font-semibold">H1: Co-Fo (SemiBold 600)</div>
                        </div>
                        <div class="mb-4">
                            <div class="text-2xl text-light-text font-medium">H2: AI 联合创始人 (Medium 500)</div>
                        </div>
                        <p class="text-light-text">
                            (Regular 400) 这是我们的正文文本。基于 `cvi-specification-v1.txt` (3.1) 中的定义，我们使用 `Inter` 字体，配合中低对比度字重（#1F2937），营造简约、友好、富有呼吸感的 Notion 风格体验。
                        </p>
                    </div>
                    <!-- V1 Dark Mode 字体应用 -->
                    <div class="bg-dark-bg rounded-lg p-6">
                        <div class="mb-4">
                            <div class="text-xs text-cofi-blue font-semibold mb-1">V1 (DARK MODE) 应用</div>
                            <div class="text-4xl text-dark-text font-bold">H1: Co-Fo (Bold 700)</div>
                        </div>
                        <div class="mb-4">
                            <div class="text-2xl text-dark-text font-semibold">H2: AI 联合创始人 (SemiBold 600)</div>
                        </div>
                        <p class="text-dark-text">
                            (Regular 400) 这是我们的正文文本。基于 `cvi-specification-v1.txt` (3.1) 中的定义，我们使用高对比度字重（#F5F5F5），在深色基底上营造高效、现代、聚焦的 MAI 风格体验。
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- 4. 辅助图形 (Graphic Elements) -->
        <section class="mb-12">
            <h2 class="text-3xl font-semibold text-light-text dark:text-dark-text border-b border-light-container dark:border-dark-container pb-3 mb-6">
                4. 辅助图形 (抽象几何)
            </h2>
            <div class="bg-light-container dark:bg-dark-container rounded-lg p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- A. "线框" (未完成状态) -->
                    <div>
                        <h3 class="text-lg font-semibold text-light-text dark:text-dark-text mb-4">A. 线框 (未完成状态)</h3>
                        <p class="text-sm text-light-wireframe dark:text-dark-wireframe mb-4">
                            用于空状态、加载动画、或待完成的模块。
                        </p>
                        <div class="flex space-x-4">
                            <!-- V2 (Light) 线框 -->
                            <div class="flex-1 text-center p-4 bg-light-bg rounded">
                                <div class="w-16 h-16 border-2 border-light-wireframe rounded-lg mx-auto mb-2" style="border-style: dashed;"></div>
                                <div class="w-16 h-16 border-2 border-light-wireframe rounded-full mx-auto mb-2" style="border-style: dashed;"></div>
                                <div class="text-xs text-light-wireframe">V2 (Light) Wireframe</div>
                            </div>
                            <!-- V1 (Dark) 线框 -->
                            <div class="flex-1 text-center p-4 bg-dark-bg rounded">
                                <div class="w-16 h-16 border-2 border-dark-wireframe rounded-lg mx-auto mb-2" style="border-style: dashed;"></div>
                                <div class="w-16 h-16 border-2 border-dark-wireframe rounded-full mx-auto mb-2" style="border-style: dashed;"></div>
                                <div class="text-xs text-dark-wireframe">V1 (Dark) Wireframe</div>
                            </div>
                        </div>
                    </div>
                    <!-- B. "涂色" (已完成状态) -->
                    <div>
                        <h3 class="text-lg font-semibold text-light-text dark:text-dark-text mb-4">B. 涂色 (已完成状态)</h3>
                        <p class="text-sm text-light-wireframe dark:text-dark-wireframe mb-4">
                            用于已完成的模块、报告封面、成就展示。
                        </p>
                        <div class="flex space-x-4">
                            <div class="w-16 h-16 rounded-lg bg-cofi-blue shadow-lg"></div>
                            <div class="w-16 h-16 rounded-full bg-cofi-green shadow-lg"></div>
                            <!-- 旋转 45 度 -->
                            <div class="w-16 h-16 rounded-lg bg-cofi-gold shadow-lg" style="transform: rotate(45deg);"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 5. UI 组件规范 (Component Library) -->
        <section>
            <h2 class="text-3xl font-semibold text-light-text dark:text-dark-text border-b border-light-container dark:border-dark-container pb-3 mb-6">
                5. UI 组件规范
            </h2>
            
            <!-- 切换按钮：用于控制 Light/Dark 模式下的组件预览 -->
            <div class="flex justify-center mb-6">
                <div class="relative bg-light-container dark:bg-dark-container p-1 rounded-full flex space-x-1">
                    <button id="btn-light" class="px-4 py-2 text-sm font-semibold rounded-full bg-white text-cofi-blue shadow-md transition-all">
                        V2 (Light Mode) 预览
                    </button>
                    <button id="btn-dark" class="px-4 py-2 text-sm font-semibold rounded-full text-light-wireframe dark:text-dark-wireframe transition-all">
                        V1 (Dark Mode) 预览
                    </button>
                </div>
            </div>

            <!-- 组件预览区 -->
            <div id="component-preview" class="bg-light-bg text-light-text p-6 md:p-10 rounded-lg border border-light-container dark:border-dark-container">
                <!-- 内部切换: Light Mode 预览内容 (默认显示) -->
                <div id="preview-light" class="space-y-6">
                    <!-- 按钮 (Buttons) -->
                    <div>
                        <h4 class="text-lg font-semibold mb-3 text-light-text">按钮 (Buttons)</h4>
                        <div class="flex flex-wrap gap-4 items-center">
                            <!-- Primary Button -->
                            <button class="px-5 py-2 rounded-lg font-semibold text-white bg-cofi-blue shadow-md hover:bg-opacity-80 transition-all">
                                主要按钮 (Primary)
                            </button>
                            <!-- Secondary Button -->
                            <button class="px-5 py-2 rounded-lg font-semibold text-light-text bg-light-bg border border-gray-300 hover:bg-light-container transition-all">
                                次要按钮 (Secondary)
                            </button>
                            <!-- Ghost Button -->
                            <button class="px-5 py-2 rounded-lg font-semibold text-light-wireframe hover:text-light-text transition-all">
                                幽灵按钮 (Ghost)
                            </button>
                        </div>
                    </div>
                    
                    <!-- 模块卡片 (Modules) -->
                    <div>
                        <h4 class="text-lg font-semibold mb-3 text-light-text">模块卡片 (线框图/涂色)</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- 线框态 (未完成) -->
                            <div class="rounded-lg p-4 bg-light-container border-2 border-dashed border-light-wireframe">
                                <h5 class="font-semibold text-light-wireframe mb-1">L3-P2.2.1-1: 行业与市场分析</h5>
                                <p class="text-sm text-light-wireframe">[待办] 点击进入工作区以完成...</p>
                            </div>
                            <!-- 涂色态 (已完成) -->
                            <div class="rounded-lg p-4 border-2 border-solid border-cofi-blue" style="background-color: rgba(59, 130, 246, 0.05);">
                                <h5 class="font-semibold text-cofi-blue mb-1">
                                    <!-- Using an empty span for alignment/mock icon -->
                                    <span class="mr-1">✓</span>L3-P2.1.2: 个人创业策略自评
                                </h5>
                                <p class="text-sm text-light-text">[已完成] 你的核心优势是战略定力。</p>
                            </div>
                        </div>
                    </div>

                    <!-- 输入框 (Inputs) -->
                    <div>
                        <h4 class="text-lg font-semibold mb-3 text-light-text">输入框 (Input Fields)</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- Default Input -->
                            <input type="text" placeholder="默认状态 (Default)"
                                   class="w-full p-3 rounded-lg bg-light-bg border border-gray-300 placeholder-light-wireframe text-light-text
                                          focus:outline-none focus:ring-2 focus:ring-cofi-blue focus:border-cofi-blue">
                            <!-- Focus Input -->
                            <input type="text" placeholder="激活状态 (Focus)"
                                   class="w-full p-3 rounded-lg bg-light-bg border-2 border-cofi-blue ring-2 ring-cofi-blue/20 placeholder-light-wireframe text-light-text
                                          focus:outline-none">
                        </div>
                    </div>
                    
                    <!-- AI 专属交互 (AI Interaction) -->
                    <div>
                        <h4 class="text-lg font-semibold mb-3 text-light-text">AI 专属交互</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- Nudge 提示 (带实心渐变图标, 移除容器脉动光晕) -->
                            <div class="bg-light-container rounded-lg p-4 flex items-center space-x-4">
                                <!-- AI Icon with Solid Gradient Fill and Flowing Animation -->
                                <div class="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white ai-gradient-fill">
                                    <!-- AI Icon (Lucide-React's Brain/Turing Icon equivalent) -->
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17.004C10.133 17.669 10.99 18 12 18s1.867-.331 2.337-.996M12 20.996C17.523 20.996 22 16.519 22 10.996S17.523 1 12 1 2 5.473 2 10.996c0 4.106 2.378 7.636 5.807 9.167"></path></svg>
                                </div>
                                <div>
                                    <div class="font-semibold text-light-text">Nudge 提示</div>
                                    <div class="text-sm text-light-wireframe">实心 AI 渐变图标 (动态)</div>
                                </div>
                            </div>
                            <!-- AI 对话栏 (AI 微光渐变边框 - 静态) -->
                            <div class="bg-light-container rounded-lg p-4 ai-gradient-border">
                                <div class="font-semibold text-light-text mb-2">AI 对话栏</div>
                                <p class="text-sm text-light-wireframe">AI 微光渐变边框 (静态)</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 内部切换: Dark Mode 预览内容 (默认隐藏) -->
                <div id="preview-dark" class="hidden space-y-6">
                    <!-- 按钮 (Buttons) -->
                    <div>
                        <h4 class="text-lg font-semibold mb-3 text-dark-text">按钮 (Buttons)</h4>
                        <div class="flex flex-wrap gap-4 items-center">
                            <!-- Primary Button -->
                            <button class="px-5 py-2 rounded-lg font-semibold text-white bg-cofi-blue shadow-md hover:bg-opacity-80 transition-all">
                                主要按钮 (Primary)
                            </button>
                            <!-- Secondary Button -->
                            <button class="px-5 py-2 rounded-lg font-semibold text-dark-text bg-dark-container border border-dark-wireframe hover:bg-opacity-80 transition-all">
                                次要按钮 (Secondary)
                            </button>
                            <!-- Ghost Button -->
                            <button class="px-5 py-2 rounded-lg font-semibold text-dark-wireframe hover:text-dark-text transition-all">
                                幽灵按钮 (Ghost)
                            </button>
                        </div>
                    </div>
                    
                    <!-- 模块卡片 (Modules) -->
                    <div>
                        <h4 class="text-lg font-semibold mb-3 text-dark-text">模块卡片 (线框图/涂色)</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- 线框态 (未完成) -->
                            <div class="rounded-lg p-4 bg-dark-container border-2 border-dashed border-dark-wireframe">
                                <h5 class="font-semibold text-dark-wireframe mb-1">L3-P2.2.1-1: 行业与市场分析</h5>
                                <p class="text-sm text-dark-wireframe">[待办] 点击进入工作区以完成...</p>
                            </div>
                            <!-- 涂色态 (已完成) -->
                            <div class="rounded-lg p-4 bg-dark-container border-2 border-solid border-cofi-blue">
                                <h5 class="font-semibold text-cofi-blue mb-1">
                                    <span class="mr-1">✓</span>L3-P2.1.2: 个人创业策略自评
                                </h5>
                                <p class="text-sm text-dark-text">[已完成] 你的核心优势是战略定力。</p>
                            </div>
                        </div>
                    </div>

                    <!-- 输入框 (Inputs) -->
                    <div>
                        <h4 class="text-lg font-semibold mb-3 text-dark-text">输入框 (Input Fields)</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- Default Input -->
                            <input type="text" placeholder="默认状态 (Default)"
                                   class="w-full p-3 rounded-lg bg-dark-bg border border-dark-wireframe placeholder-dark-wireframe text-dark-text
                                          focus:outline-none focus:ring-2 focus:ring-cofi-blue focus:border-cofi-blue">
                            <!-- Focus Input -->
                            <input type="text" placeholder="激活状态 (Focus)"
                                   class="w-full p-3 rounded-lg bg-dark-bg border-2 border-cofi-blue ring-2 ring-cofi-blue/20 placeholder-dark-wireframe text-dark-text
                                          focus:outline-none">
                        </div>
                    </div>
                    
                    <!-- AI 专属交互 (AI Interaction) -->
                    <div>
                        <h4 class="text-lg font-semibold mb-3 text-dark-text">AI 专属交互</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- Nudge 提示 (带实心渐变图标, 移除容器脉动光晕) -->
                            <div class="bg-dark-container rounded-lg p-4 flex items-center space-x-4">
                                <!-- AI Icon with Solid Gradient Fill and Flowing Animation -->
                                <div class="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white ai-gradient-fill">
                                    <!-- AI Icon (Lucide-React's Brain/Turing Icon equivalent) -->
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17.004C10.133 17.669 10.99 18 12 18s1.867-.331 2.337-.996M12 20.996C17.523 20.996 22 16.519 22 10.996S17.523 1 12 1 2 5.473 2 10.996c0 4.106 2.378 7.636 5.807 9.167"></path></svg>
                                </div>
                                <div>
                                    <div class="font-semibold text-dark-text">Nudge 提示</div>
                                    <div class="text-sm text-dark-wireframe">实心 AI 渐变图标 (动态)</div>
                                </div>
                            </div>
                            <!-- AI 对话栏 (AI 微光渐变边框 - 静态) -->
                            <div class="bg-dark-container rounded-lg p-4 ai-gradient-border">
                                <div class="font-semibold text-dark-text mb-2">AI 对话栏</div>
                                <p class="text-sm text-dark-wireframe">AI 微光渐变边框 (静态)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>

    </div>

    <script>
        // 获取元素
        const btnLight = document.getElementById('btn-light');
        const btnDark = document.getElementById('btn-dark');
        const previewLight = document.getElementById('preview-light');
        const previewDark = document.getElementById('preview-dark');
        const componentPreview = document.getElementById('component-preview');
        const body = document.body;

        // 切换 Light Mode (V2)
        function switchToLightMode() {
            // 切换按钮样式
            btnLight.classList.add('bg-white', 'text-cofi-blue', 'shadow-md');
            btnLight.classList.remove('text-light-wireframe', 'dark:text-dark-wireframe');
            
            btnDark.classList.remove('bg-white', 'text-cofi-blue', 'shadow-md');
            btnDark.classList.add('text-light-wireframe', 'dark:text-dark-wireframe');

            // 切换预览内容
            previewLight.classList.remove('hidden');
            previewDark.classList.add('hidden');
            
            // 切换组件预览容器的背景和文本颜色，并移除 dark class
            componentPreview.classList.remove('dark', 'bg-dark-bg', 'text-dark-text');
            componentPreview.classList.add('bg-light-bg', 'text-light-text', 'border-light-container');
            componentPreview.classList.remove('border-dark-container');

            // 切换全局模式（可选，如果需要连同整个页面一起切换）
            body.classList.remove('dark');
        }

        // 切换 Dark Mode (V1)
        function switchToDarkMode() {
            // 切换按钮样式
            btnDark.classList.add('bg-white', 'text-cofi-blue', 'shadow-md');
            btnDark.classList.remove('text-light-wireframe', 'dark:text-dark-wireframe');
            
            btnLight.classList.remove('bg-white', 'text-cofi-blue', 'shadow-md');
            btnLight.classList.add('text-light-wireframe', 'dark:text-dark-wireframe');

            // 切换预览内容
            previewDark.classList.remove('hidden');
            previewLight.classList.add('hidden');

            // 切换组件预览容器的背景和文本颜色，并添加 dark class
            componentPreview.classList.add('dark', 'bg-dark-bg', 'text-dark-text', 'border-dark-container');
            componentPreview.classList.remove('bg-light-bg', 'text-light-text', 'border-light-container');

            // 切换全局模式（可选，如果需要连同整个页面一起切换）
            body.classList.add('dark');
        }

        // 绑定事件监听器
        btnLight.addEventListener('click', switchToLightMode);
        btnDark.addEventListener('click', switchToDarkMode);

        // 页面加载完成后，设置默认模式为 Light Mode (V2)
        document.addEventListener('DOMContentLoaded', () => {
            switchToLightMode();
        });
    </script>

</body>
</html>