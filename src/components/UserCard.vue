<template>
    <v-menu open-on-hover open-delay="100">
        <template #activator="{ props }">
            <p v-bind="props" class="text-secondary cursor-help">
                {{ userData.first_name }} {{ userData.last_name }}
            </p>
        </template>
        <div class="frame">
            <div class="center">
                <div class="profile">
                    <div class="image">
                        <div class="circle-1"></div>
                        <div class="circle-2"></div>
                        <img :src="userData.picture" width="70" height="70" alt="Jessica Potter" />
                    </div>

                    <div class="name">
                        {{ userData.first_name }} {{ userData.middle_name }}
                        {{ userData.last_name }}
                    </div>
                    <div class="job">{{ userData.phone }}</div>
                    <div class="job">{{ userData.address }}</div>
                </div>

                <div class="stats">
                    <div class="box">
                        <span class="value">10</span>
                        <span class="parameter">Книг</span>
                    </div>
                    <div class="box">
                        <span class="value">12</span>
                        <span class="parameter">Обмінів</span>
                    </div>
                </div>
            </div>
        </div>
    </v-menu>
</template>

<script>
export default {
    name: 'UserCard',
    props: {
        userData: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
$brown: #786450;

.frame {
    width: 400px;
    height: 300px;
    margin-top: -200px;
    margin-left: -200px;
    border-radius: 2px;
    box-shadow: 1px 2px 10px 0px rgba(0, 0, 0, 0.3);
    background: #ca7c4e;
    background: -webkit-linear-gradient(bottom left, #eebe6c 0%, #ca7c4e 100%);
    background: -moz-linear-gradient(bottom left, #eebe6c 0%, #ca7c4e 100%);
    background: -o-linear-gradient(bottom left, #eebe6c 0%, #ca7c4e 100%);
    background: linear-gradient(to top right, #eebe6c 0%, #ca7c4e 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#EEBE6C', endColorstr='#CA7C4E',GradientType=1 );
    color: $brown;
    font-family: 'Open Sans', Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.center {
    position: absolute;
    top: 50px;
    left: 40px;
    height: 199px;
    width: 320px;
    background: #fff;
    border-radius: 3px;
    overflow: hidden;
    box-shadow: 10px 10px 15px 0 rgba(0, 0, 0, 0.3);
}

.profile {
    float: left;
    width: 200px;
    height: 320px;
    text-align: center;

    .image {
        position: relative;
        width: 70px;
        height: 70px;
        margin: 38px auto 0 auto;

        .circle-1 {
            position: absolute;
            box-sizing: border-box;
            width: 76px;
            height: 76px;
            top: -3px;
            left: -3px;
            border-width: 1px;
            border-style: solid;
            border-color: $brown $brown $brown transparent;
            border-radius: 50%;
            transition: all 1.5s ease-in-out;
        }

        .circle-2 {
            @extend .circle-1;
            width: 82px;
            height: 82px;
            top: -6px;
            left: -6px;
            border-color: $brown transparent $brown $brown;
        }

        img {
            display: block;
            border-radius: 50%;
            background: #f5e8df;
        }

        &:hover {
            cursor: pointer;

            .circle-1 {
                transform: rotate(360deg);
            }

            .circle-2 {
                transform: rotate(-360deg);
            }
        }
    }

    .name {
        font-size: 12px;
        font-weight: 600;
        margin-top: 20px;
    }

    .job {
        font-size: 11px;
        line-height: 15px;
    }
}

.stats {
    float: left;

    .box {
        box-sizing: border-box;
        width: 120px;
        height: 99px;
        background: #f5e8df;
        text-align: center;
        padding-top: 28px;
        transition: all 0.4s ease-in-out;

        &:hover {
            background: #e1cfc2;
            cursor: pointer;
        }

        &:nth-child(2) {
            margin: 1px 0;
        }
    }

    span {
        display: block;
    }

    .value {
        font-size: 18px;
        font-weight: 600;
    }

    .parameter {
        font-size: 11px;
    }
}
</style>
