<template>
    <div class="about about-page-container">
        <div class="page-title mb-6">Переваги обміну книгами онлайн</div>
        <div class="advantages">
            <div class="advantages__block">
                <div class="advantages__block-header">Економія коштів</div>
                <div class="advantages__block-content">
                    Купівля нових книг може бути дорогою, але з нашим сайтом ви отримуєте доступ до
                    сотень книг абсолютно безкоштовно, просто обмінюючись власними.
                </div>
            </div>
            <div class="advantages__block">
                <div class="advantages__block-header">Сталий розвиток</div>
                <div class="advantages__block-content">
                    Обмін книгами сприяє зменшенню використання природних ресурсів, адже ви
                    допомагаєте книгам знайти нових читачів замість того, щоб вони лежали без діла
                    або потрапляли на смітник.
                </div>
            </div>
            <div class="advantages__block">
                <div class="advantages__block-header">Спільнота книгоманів</div>
                <div class="advantages__block-content">
                    Наш сайт об’єднує людей, які люблять читати. Ви зможете знайти однодумців,
                    обговорювати улюблені книги та ділитися рекомендаціями. Різноманіття вибору. У
                    нашій бібліотеці ви знайдете книги на будь-який смак — від класичної літератури
                    до сучасних бестселерів, від наукової фантастики до бізнес-літератури та
                    саморозвитку.
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.page-title {
    font-family: Inter;
    font-size: 32px;
    font-weight: 600;
    line-height: 28px;
    text-align: left;
    color: #211d43;
}
.advantages {
    display: flex;
    gap: 32px;
    flex-wrap: wrap;

    .advantages__block {
        background: #ffffff;
        box-shadow: 0 5.33px 16px 0 #0000000a;
        flex: calc((100% - 2 * 32px) / 3);
        border-radius: 10px;
        min-width: 400px;
        max-width: 50%;

        .advantages__block-header {
            border-top-left-radius: inherit;
            border-top-right-radius: inherit;
            font-family: Inter;
            padding: 24px 10px;
            font-size: 24px;
            font-weight: 500;
            line-height: 32px;
            text-align: center;
            color: #ffffff;
            background: radial-gradient(73.78% 1247.04% at 85.68% 100%, #182352 0%, #344178 100%);
        }
        .advantages__block-content {
            padding: 20px;
        }
    }
}

@media screen and (max-width: #{$md}) {
    .advantages {
        .advantages__block {
            max-width: 100%;
        }
    }
}
</style>
