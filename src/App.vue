<template>
	<div>
		<center>
			<div class="container">
				<div class="wrapper">
					<div class="row mt-5">
						<div 
							class="col-md-10 offset-md-1"							
						>
							<ul class="list-group" 
							style="height: 40px; background: #2d7364; display: inline-table; text-align: left; padding: 0.7% 0% 0.7% 2%;">
								<!-- <li class=""></li> -->
								<img
										:src="user.image" 
										class="img-fluide"
										style="width: 31px; border-radius: 100%;"
									/>
									<span
									style="color: #fff;
										font-weight: 700;
										vertical-align: middle;
										padding: 0% 0% 0% 0.5%;
										font-size: 19px;"	
									>
										{{ user.name }}
									</span>
							</ul>
						</div>
					</div>
					<div class="row" >
						<div 
							class="col-md-10 offset-md-1"							
						>
							<ul class="messages list-group" v-chat-scroll="{smooth: true}"
							>
								<li
									class="message list-group-item animated faster"
									v-for="(msg, i) in messages" 
									:key="i"
									style="width: 100%; height: auto;"
									:class="[ msg.user === 1 ? `zoomInRight` : `zoomInLeft` ]"
								>
									<span class="chat" :class="[ msg.user === 1 ? `me` : `other` ]">
										<p style="width: 100%;">
											{{ msg.msg }}
										</p>
										<p style="width: 100%;" :class="[ msg.user === 1 ? `me-date` : `other-date` ]">
											{{ formatDate() }}
										</p>
									</span>
								</li><br/>								
							</ul>
						</div>						
					</div>
					<form @submit.prevent="sendMessage">
					<div class="row" >
						<div 
							class="col-md-10 offset-md-1"							
						>			
							<div class="row">
								<div class="col-md-12 input-group">									
									<input 
										type="text" 
										class="form-control" 
										v-model="message" 
										placeholder="Type a message"
										autofocus 
									/>
									<div class="input-group-prepend" @click="sendMessage">
										<span class="input-group-text" id="basic-addon1" style="background: #399c86;
											border: none;
											color: #fff;"	
										>Send</span>
									</div>
								</div>
								<!-- <div class="col-md-1">
									<button 
										type="submit"
										class="btn btn-primary"
										style="margin-left: -23.5% !important;"
									>
										send
									</button>
								</div> -->
							</div>							
						</div>						
					</div>
					</form>						
				</div>
			</div>
		</center>
	</div>
</template>

<script>
import io from 'socket.io-client';
export default {
	data() {
		return {
			socket : io('localhost:3000'),
			messages: [],
			message: '',
			user: {},
		};
	},
	mounted() {
		this.socket.on('user', (data) => {
            this.user = data;
        });
		this.socket.on('user_1', (data) => {
            this.messages = [...this.messages, data];
        });
		this.socket.on('user_2', (data) => {
            this.messages = [...this.messages, data];
        });
	},
	methods: {
		sendMessage() {
			if(this.message) {
				this.socket.emit('user_1', {
					user: 1,
					name: 'Abijit',
					date: this.formatDate(),
					msg: this.message,
				});
				this.message = '';
			}
		},
		formatDate() {
			return this.$moment().format('MMMM Do YYYY, h:mm a');
		}
	},
}
</script>

<style scoped>
    * {
        font-family: 'Nunito', sans-serif;
    }
	p {
		margin: 0;
	}
	ul {
		height: 60vh;
		overflow-y: scroll;
		width: 100%;
		/* border: 2px solid #d5d5d5; */
		/* border-radius: 16px;	 */
		padding: 2% 1% 2% 5%;
		background: url('https://www.elsetge.cat/imagepost/b/76/761254_whatsapp-chat-wallpaper-download.jpg');
		background-position: center;
	}
    li {
        list-style: none;
    }
	.form-control:focus {
		border-color: #d0ffc8;
		-webkit-box-shadow: none;
		box-shadow: none;
	}
    .chat {
        font-size: 15px;
        font-weight: 700;
        margin-bottom: 9px;
        padding: 9px 46px;
		width: auto;
		max-width: 875px;
    }
    .me {
        background: #d0ffc8;
        text-align: right;        
        border-radius: 50px 50px 18px 50px;
		float: right;     
		margin-right: 1%;   
    }
    .other {
        background: #defff1;
        text-align: left;
        border-radius: 18px 50px 50px 50px;
		float: left;
		margin-left: -3%;
    }
	.me-date {
		font-size: 10px;
    	text-align: left;
	}
	.other-date {
		font-size: 10px;
    	text-align: right;
	}
	::-webkit-scrollbar {
		width: 5px;
	}
	.list-group-item {
		border: none !important;
		padding: 0 !important;
		background: transparent !important;
 	}
	 .input-group-prepend:hover {
		 cursor: pointer;
	 }
</style>
