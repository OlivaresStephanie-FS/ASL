use chrono::prelude::*;

fn main() {
    let local: DateTime<Local> = Local::now();
    println!("Hello World, {}", local.format("%Y-%m-%d").to_string());
}