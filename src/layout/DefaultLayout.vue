<template>
    <section class="bg-white dark:bg-black h-screen flex flex-col flex-nowrap">
        <div aria-hidden="true"
             class="absolute inset-0 h-max w-full mx-auto -z-0 pointer-events-none grid grid-cols-2 -space-x-52 opacity-50 dark:opacity-20">
            <div class="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
            <div class="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
        </div>
<!--        <main-header/>-->
        <main class="space-y-4 pt-6 pb-6 flex-1 bg-white/50 z-0">
            <div class="md:container md:mx-auto">
                <slot />
            </div>
        </main>
        <main-footer/>
    </section>
</template>
