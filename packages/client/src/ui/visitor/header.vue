<template>
<div class="sqxihjet">
	<div class="wide">
		<div v-if="narrow === false" class="content">
      <img @click="jumpToHome" :src="$instance.iconUrl || $instance.faviconUrl || '/favicon.ico'" class="header-logo"/>
			<MkA to="/explore" class="link" active-class="active"><i class="ti ti-hash icon"></i>{{ $ts.explore }}</MkA>
			<MkA to="/pages" class="link" active-class="active"><i class="ti ti-news icon"></i>{{ $ts.pages }}</MkA>
      <MkA to="/announcements" class="link" active-class="active"><i class="ti ti-speakerphone icon"></i>{{ $ts.announcements }}</MkA>
			<div v-if="info" class="page active link">
				<div class="title">
					<i v-if="info.icon" class="icon" :class="info.icon"></i>
					<MkAvatar v-else-if="info.avatar" class="avatar" :user="info.avatar" :disable-preview="true" :show-indicator="true"/>
					<span v-if="info.title" class="text">{{ info.title }}</span>
					<MkUserName v-else-if="info.userName" :user="info.userName" :nowrap="false" class="text"/>
				</div>
				<button v-if="info.action" class="_button action" @click.stop="info.action.handler"><!-- TODO --></button>
			</div>
			<div class="right">
				<button class="_buttonPrimary signup" @click="signup()">{{ $ts.signup }}</button>
				<button class="_button login" @click="signin()">{{ $ts.login }}</button>
			</div>
		</div>
	</div>
	<div v-if="narrow === true" class="narrow">
		<button class="menu _button" @click="$parent.showMenu = true">
			<i class="ti ti-menu-2 icon"></i>
		</button>
    <img @click="jumpToHome" :src="$instance.iconUrl || $instance.faviconUrl || '/favicon.ico'" class="header-logo-mobile"/>
    <MkA to="/" class="instance-name" active-class="active"><span>{{ instanceName() }}</span></MkA>
    <div v-if="info" class="title">
			<i v-if="info.icon" class="icon" :class="info.icon"></i>
			<MkAvatar v-else-if="info.avatar" class="avatar" :user="info.avatar" :disable-preview="true" :show-indicator="true"/>
			<span v-if="info.title" class="text">{{ info.title }}</span>
			<MkUserName v-else-if="info.userName" :user="info.userName" :nowrap="false" class="text"/>
		</div>
		<button v-if="info && info.action" class="action _button" @click.stop="info.action.handler">
			<!-- TODO -->
		</button>
	</div>
</div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import XSigninDialog from '@/components/MkSigninDialog.vue';
import XSignupDialog from '@/components/MkSignupDialog.vue';
import * as os from '@/os';
import { search } from '@/scripts/search';
import {i18n} from "@/i18n";
import { instanceName } from '@/config';

export default defineComponent({
	props: {
		info: {
			required: true,
		},
	},

	data() {
		return {
			narrow: null,
			showMenu: false,
		};
	},

	mounted() {
		this.narrow = this.$el.clientWidth < 800;
	},

	methods: {
    instanceName() {
      return instanceName
    },
    jumpToHome() {
      window.location.href = '/';
    },

		signin() {
			os.popup(XSigninDialog, {
				autoSet: true,
			}, {}, 'closed');
		},

		signup() {
			os.popup(XSignupDialog, {
				autoSet: true,
			}, {}, 'closed');
		},

		search,
	},
});
</script>

<style lang="scss" scoped>
.sqxihjet {
	$height: 60px;
	position: sticky;
	top: 0;
	left: 0;
	z-index: 1000;
	line-height: $height;
	-webkit-backdrop-filter: var(--blur, blur(32px));
	backdrop-filter: var(--blur, blur(32px));
	background-color: var(--X16);

	> .wide {
		> .content {
			margin: 0 auto;
			display: flex;
			align-items: center;
			background: linear-gradient(330deg,var(--accentedBg),var(--accentLighten),var(--bg));
      background-size: cover;

      > .header-logo {
        height: auto;
        width: 30px;
        padding: 0 10px 0 15px;
				border-radius: 4px;
      }

			> .link {
				$line: 3px;
				display: inline-block;
				padding: 0 16px;
				line-height: $height - ($line * 2);
				border-top: solid $line transparent;
				border-bottom: solid $line transparent;

				> .icon {
					margin-right: 0.5em;
				}

				&.page {
					border-bottom-color: var(--accent);
				}
			}

			> .page {
				> .title {
					display: inline-block;
					vertical-align: bottom;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					position: relative;

					> .icon + .text {
						margin-left: 8px;
					}

					> .avatar {
						$size: 32px;
						display: inline-block;
						width: $size;
						height: $size;
						vertical-align: middle;
						margin-right: 8px;
						pointer-events: none;
					}

					&._button {
						&:hover {
							color: var(--fgHighlighted);
						}
					}

					&.selected {
						box-shadow: 0 -2px 0 0 var(--accent) inset;
						color: var(--fgHighlighted);
					}
				}

				> .action {
					padding: 0 0 0 16px;
				}
			}

			> .right {
				margin-left: auto;

				> .search {
					background: var(--bg);
					border-radius: 999px;
					width: 230px;
					line-height: $height - 20px;
					margin-right: 16px;
					text-align: left;

					> * {
						opacity: 0.7;
					}

					> .icon {
						padding: 0 16px;
					}
				}

				> .signup {
					border-radius: 999px;
					padding: 0 24px;
					line-height: $height - 20px;
				}

				> .login {
          background: var(--bg);
          border-radius: 999px;
					padding: 0 24px;
          line-height: $height - 20px;
          margin: 0 16px 0 16px;
				}
			}
		}
	}

	> .narrow {
		display: flex;
		background: linear-gradient(330deg,var(--accentedBg),var(--accentLighten),var(--bg));
    background-size: cover;

    > .header-logo-mobile {
      height: 35px;
      width: auto;
      padding-top: 12px;
    }

    > .instance-name {
      font-size: 20px;
      padding-left: 10px;
    }

		> .menu,
		> .action {
			width: $height;
			height: $height;
			font-size: 20px;
		}

		> .title {
			flex: 1;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			position: relative;
			text-align: center;

			> .icon + .text {
				margin-left: 8px;
			}

			> .avatar {
				$size: 32px;
				display: inline-block;
				width: $size;
				height: $size;
				vertical-align: middle;
				margin-right: 8px;
				pointer-events: none;
			}
		}
	}
}
</style>
